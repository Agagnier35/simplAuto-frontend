import React, { Component } from 'react';
import StyledForm from '../CarAdd/Form';
import { multi, MultiProps } from '../../lib/MultiLang';
import { Mutation, Query } from 'react-apollo';
import { AdCreateInput } from '../../generated/graphql';
import gql from 'graphql-tag';
import { Form, Button, Card } from 'react-bootstrap';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import Select from '../Select';
import Router from 'next/router';
import { GET_FEATURES_QUERY } from '../CarAdd';

const CREATE_ADD_MUTATION = gql`
  mutation CREATE_ADD_MUTATION($data: AdCreateInput!) {
    createAd(data: $data) {
      id
    }
  }
`;

// to be removed
type KeyValue = { [key: string]: any };
type Dictionnary<T> = T & KeyValue;

class CreateAd extends Component<MultiProps, Dictionnary<AdCreateInput>> {
  state: AdCreateInput = {
    features: null,
    manufacturerFeature: null,
    modelFeature: null,
    categoryFeature: null,
    yearLowerBoundFeature: null,
    yearHigherBoundFeature: null,
    mileageLowerBoundFeature: null,
    mileageHigherBoundFeature: null,
    priceLowerBoundFeature: null,
    priceHigherBoundFeature: null,
  };

  handleCreateAd = async (e: any, createAd: any) => {
    e.preventDefault();
    await createAd();
  };

  handleFeaturesChange = (value: any) => {
    const { translations } = this.props;
    const features = this.state.features || [];
    const featureIndex = features.findIndex(
      (feature: any) => feature.category === value.category,
    );

    const featureExists = featureIndex > -1;
    const isDefaultValue = value.value === translations.general.none;

    if (featureExists) {
      if (isDefaultValue || value.isCheckbox) {
        // Remove it
        this.setState({
          features: [
            ...features.slice(0, featureIndex),
            ...features.slice(featureIndex + 1),
          ],
        });
      } else {
        // Update the current value
        // TODO Remove model when we change manufacturer
        this.setState({
          features: [
            ...features.slice(0, featureIndex),
            value,
            ...features.slice(featureIndex + 1),
          ],
        });
      }
    }
    // Add it
    else if (!isDefaultValue) {
      this.setState({
        features: [...features, value],
      });
    }
  };

  handleChange = (key: string, value: any, accessor?: string) => {
    if (key === 'features') {
      this.handleFeaturesChange(value);
    } else {
      // Not a feature
      if (accessor) {
        this.setState(prevState => ({
          [key]: { ...prevState[key], [accessor]: value.value },
        }));
      }
    }
  };

  getModelsForManufacturer = (data: any) => {
    const { manufacturerFeature } = this.state;
    if (manufacturerFeature && manufacturerFeature.manufacturerID) {
      return data.manufacturers.find(
        (item: any) => item.id === manufacturerFeature.manufacturerID,
      ).models;
    }
    return [];
  };

  render() {
    const {
      translations: { carLabel, cars, general, carFeatureCategory, ad },
    } = this.props;
    const { manufacturerFeature } = this.state;
    let fetchedCheckboxFeatures: any;
    let fetchedDropdownFeatures: any;
    return (
      <Query query={GET_FEATURES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          fetchedCheckboxFeatures = data.carFeatureCategories.filter(
            (category: any) => category.type === 'TRUE_FALSE',
          );
          fetchedDropdownFeatures = data.carFeatureCategories.filter(
            (category: any) => category.type === 'MULTIPLE_CHOICE',
          );
          return (
            <Mutation
              mutation={CREATE_ADD_MUTATION}
              variables={{ data: this.state }}
            >
              {(createAd, mutation) => {
                if (mutation.data && mutation.data.createAd) {
                  const adID = mutation.data.createAd.id;
                  Router.push(`/ad?id=${adID}`);
                }
                return (
                  <StyledForm onSubmit={e => this.handleCreateAd(e, createAd)}>
                    <h1>{ad.createAdTitle}</h1>
                    <ErrorMessage error={mutation.error} />
                    <Card>
                      <Card.Body>
                        <Card.Title>
                          <span className="card-number">1</span>
                          {carLabel.general}
                        </Card.Title>
                        <div className="label-wrapper">
                          <Select
                            options={data.manufacturers}
                            accessor="name"
                            handleChange={(item: any) =>
                              this.handleChange(
                                'manufacturerFeature',
                                { value: item.id },
                                'manufacturerID',
                              )
                            }
                            label={`${cars.manufacturer} :`}
                          />
                          <Select
                            options={this.getModelsForManufacturer(data)}
                            disabled={!manufacturerFeature}
                            accessor="name"
                            handleChange={(item: any) =>
                              this.handleChange(
                                'modelFeature',
                                { value: item.id },
                                'modelID',
                              )
                            }
                            label={`${cars.model} :`}
                          />
                          <Select
                            options={data.carCategories}
                            accessor="name"
                            handleChange={(item: any) =>
                              this.handleChange(
                                'categoryFeature',
                                { value: item.id },
                                'categoryID',
                              )
                            }
                            label={`${cars.category} :`}
                          />

                          <label>
                            {cars.year} {general.min}
                            <Form.Control
                              type="text"
                              placeholder={`${cars.year} ${general.min}`}
                              onChange={(e: any) =>
                                this.handleChange(
                                  'yearLowerBoundFeature',
                                  {
                                    value: parseInt(e.currentTarget.value, 10),
                                  },
                                  'year',
                                )
                              }
                            />
                          </label>

                          <label>
                            {cars.year} {general.max}
                            <Form.Control
                              type="text"
                              placeholder={`${cars.year} ${general.max}`}
                              onChange={(e: any) =>
                                this.handleChange(
                                  'yearHigherBoundFeature',
                                  {
                                    value: parseInt(e.currentTarget.value, 10),
                                  },
                                  'year',
                                )
                              }
                            />
                          </label>
                          <label>
                            {cars.mileage} {general.min}
                            <Form.Control
                              type="text"
                              placeholder={`${cars.mileage} ${general.min}`}
                              onChange={(e: any) =>
                                this.handleChange(
                                  'mileageLowerBoundFeature',
                                  {
                                    value: parseInt(e.currentTarget.value, 10),
                                  },
                                  'mileage',
                                )
                              }
                            />
                          </label>
                          <label>
                            {cars.mileage} {general.max}
                            <Form.Control
                              type="text"
                              placeholder={`${cars.mileage} ${general.max}`}
                              onChange={(e: any) =>
                                this.handleChange(
                                  'mileageHigherBoundFeature',
                                  {
                                    value: parseInt(e.currentTarget.value, 10),
                                  },
                                  'mileage',
                                )
                              }
                            />
                          </label>
                          <label>
                            {cars.price} {general.min}
                            <Form.Control
                              type="text"
                              placeholder={`${cars.price} ${general.min}`}
                              onChange={(e: any) =>
                                this.handleChange(
                                  'priceLowerBoundFeature',
                                  {
                                    value: parseInt(e.currentTarget.value, 10),
                                  },
                                  'price',
                                )
                              }
                            />
                          </label>
                          <label>
                            {cars.price} {general.max}
                            <Form.Control
                              type="text"
                              placeholder={`${cars.price} ${general.max}`}
                              onChange={(e: any) =>
                                this.handleChange(
                                  'priceHigherBoundFeature',
                                  {
                                    value: parseInt(e.currentTarget.value, 10),
                                  },
                                  'price',
                                )
                              }
                            />
                          </label>
                        </div>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>
                          <span className="card-number">2</span>
                          {general.features}
                        </Card.Title>
                        <div className="label-wrapper no-grow">
                          {fetchedDropdownFeatures.map((feature: any) => (
                            <Select
                              key={feature.id}
                              options={feature.features}
                              accessor="name"
                              handleChange={(item: any) =>
                                this.handleChange('features', {
                                  value: item.id,
                                  category: feature.name,
                                })
                              }
                              label={`${carFeatureCategory[feature.name]} :`}
                            />
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                    <div className="card-wrapper">
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            <span className="card-number">3</span>
                            {carLabel.addons}
                          </Card.Title>

                          {fetchedCheckboxFeatures.map((feature: any) => (
                            <Form.Check
                              key={feature.id}
                              type="checkbox"
                              label={carFeatureCategory[feature.name]}
                              onClick={() =>
                                this.handleChange('features', {
                                  value: feature.features[0].id,
                                  category: feature.name,
                                  isCheckbox: true,
                                })
                              }
                            />
                          ))}
                        </Card.Body>
                      </Card>
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            <span className="card-number">5</span>
                            {general.submit}
                          </Card.Title>
                          <Button
                            variant="primary"
                            className="formSubmit"
                            type="submit"
                          >
                            {ad.createAdAction}
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  </StyledForm>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
export default multi(CreateAd);
