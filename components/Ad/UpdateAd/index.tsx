import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { AdUpdateInput } from '../../../generated/graphql';
import StyledForm from '../../Car/CarAdd/Form';
import { Form, Button, Card } from 'react-bootstrap';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import Select from '../../General/Select';
import Router from 'next/router';
import { GET_FEATURES_QUERY } from '../../Car/CarAdd';
import { ALL_ADS_QUERY } from '../Ads/Queries';
import { AD_DETAIL_QUERY } from '../AdDetail/Queries';

const UPDATE_AD_MUTATION = gql`
  mutation UPDATE_AD_MUTATION($data: AdUpdateInput!) {
    updateAd(data: $data) {
      id
    }
  }
`;

type KeyValue = { [key: string]: any };
type Dictionnary<T> = T & KeyValue;

class UpdateLogin extends Component<MultiProps, Dictionnary<AdUpdateInput>> {
  state: AdUpdateInput = {
    id: '',
    features: null,
    manufacturerID: null,
    modelID: null,
    categoryID: null,
    yearLowerBound: null,
    yearHigherBound: null,
    mileageLowerBound: null,
    mileageHigherBound: null,
    priceLowerBound: null,
    priceHigherBound: null,
  };

  isFirstRender: Boolean = true;

  // Get l'offre, puis mettre les infos dans le state.

  handleUpdateAd = async (e: any, updateAd: any) => {
    e.preventDefault();
    await updateAd();
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

  fillState = (data: any) => {
    if (this.isFirstRender) {
      this.setState({
        id: data.ad.id,
        features: data.ad.features,
        manufacturerID: data.ad.manufacturer.id,
        modelID: data.ad.model.id,
        categoryID: data.ad.category.id,
        yearLowerBound: data.ad.yearLowerBound,
        yearHigherBound: data.ad.yearHigherBound,
        mileageLowerBound: data.ad.mileageLowerBound,
        mileageHigherBound: data.ad.mileageHigherBound,
        priceLowerBound: data.ad.priceLowerBound,
        priceHigherBound: data.ad.priceHigherBound,
      });
      this.isFirstRender = false;
    }
  };

  handleChange = (key: string, value: any, accessor?: string) => {
    if (key === 'features') {
      this.handleFeaturesChange(value);
    } else {
      // Not a feature
      if (accessor) {
        this.setState((prevState: any) => ({
          [key]: { ...prevState[key], [accessor]: value.value },
        }));
      }
    }
  };

  getModelsForManufacturer = (data: any) => {
    const { manufacturerID } = this.state;
    if (manufacturerID) {
      return data.manufacturers.find((item: any) => item.id === manufacturerID)
        .models;
    }
    return [];
  };

  fieldToString = (field: number | null | undefined) => {
    if (!field) {
      return '';
    }

    return field.toString();
  };

  render() {
    const {
      translations: { carLabel, cars, general, carFeatureCategory, ad },
    } = this.props;
    const { manufacturerID } = this.state;
    let fetchedCheckboxFeatures: any;
    let fetchedDropdownFeatures: any;
    return (
      <Query
        query={AD_DETAIL_QUERY}
        variables={{ id: this.props.adId }}
        onCompleted={data => this.fillState(data)}
      >
        {({ loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
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
                    mutation={UPDATE_AD_MUTATION}
                    variables={{ data: this.state }}
                  >
                    {(createAd, mutation) => {
                      if (mutation.data && mutation.data.createAd) {
                        const adID = mutation.data.createAd.id;
                        Router.push(`/adDetail?id=${adID}`);
                      }
                      return (
                        <StyledForm
                          onSubmit={e => this.handleUpdateAd(e, createAd)}
                        >
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
                                    this.handleChange('manufacturerID', {
                                      value: item.id,
                                    })
                                  }
                                  value={data.manufacturers}
                                  label={`${cars.manufacturer} :`}
                                />
                                <Select
                                  options={this.getModelsForManufacturer(data)}
                                  disabled={!manufacturerID}
                                  accessor="name"
                                  handleChange={(item: any) =>
                                    this.handleChange('modelID', {
                                      value: item.id,
                                    })
                                  }
                                  label={`${cars.model} :`}
                                />
                                <Select
                                  options={data.carCategories}
                                  accessor="name"
                                  handleChange={(item: any) =>
                                    this.handleChange('categoryID', {
                                      value: item.id,
                                    })
                                  }
                                  label={`${cars.category} :`}
                                />

                                <label>
                                  {cars.year} {general.min}
                                  <Form.Control
                                    type="text"
                                    placeholder={`${cars.year} ${general.min}`}
                                    defaultValue={this.fieldToString(
                                      this.state.yearLowerBound,
                                    )}
                                    onChange={(e: any) =>
                                      this.handleChange('yearLowerBound', {
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  {cars.year} {general.max}
                                  <Form.Control
                                    type="text"
                                    placeholder={`${cars.year} ${general.max}`}
                                    defaultValue={this.fieldToString(
                                      this.state.yearHigherBound,
                                    )}
                                    onChange={(e: any) =>
                                      this.handleChange('yearHigherBound', {
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  {cars.mileage} {general.min}
                                  <Form.Control
                                    type="text"
                                    placeholder={`${cars.mileage} ${
                                      general.min
                                    }`}
                                    defaultValue={this.fieldToString(
                                      this.state.mileageLowerBound,
                                    )}
                                    onChange={(e: any) =>
                                      this.handleChange('mileageLowerBound', {
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  {cars.mileage} {general.max}
                                  <Form.Control
                                    type="text"
                                    placeholder={`${cars.mileage} ${
                                      general.max
                                    }`}
                                    defaultValue={this.fieldToString(
                                      this.state.mileageHigherBound,
                                    )}
                                    onChange={(e: any) =>
                                      this.handleChange('mileageHigherBound', {
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  {cars.price} {general.min}
                                  <Form.Control
                                    type="text"
                                    placeholder={`${cars.price} ${general.min}`}
                                    defaultValue={this.fieldToString(
                                      this.state.priceLowerBound,
                                    )}
                                    onChange={(e: any) =>
                                      this.handleChange('priceLowerBound', {
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  {cars.price} {general.max}
                                  <Form.Control
                                    type="text"
                                    placeholder={`${cars.price} ${general.max}`}
                                    defaultValue={this.fieldToString(
                                      this.state.priceHigherBound,
                                    )}
                                    onChange={(e: any) =>
                                      this.handleChange('priceHigherBound', {
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
                                      })
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
                                    label={`${
                                      carFeatureCategory[feature.name]
                                    } :`}
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
        }}
      </Query>
    );
  }
}

export default multi(UpdateLogin);
