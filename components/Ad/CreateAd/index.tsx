import React, { Component } from 'react';
import StyledForm from '../../Car/CarAdd/Form';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Mutation, Query } from 'react-apollo';
import { AdCreateInput } from '../../../generated/graphql';
import gql from 'graphql-tag';
import { Form, Button, Card } from 'react-bootstrap';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import Select from '../../General/Select';
import Router from 'next/router';
import { GET_FEATURES_QUERY } from '../../Car/CarAdd';

const CREATE_ADD_MUTATION = gql`
  mutation CREATE_ADD_MUTATION($data: AdCreateInput!) {
    createAd(data: $data) {
      id
    }
  }
`;

const redAsterixStyle = {
  color: 'red',
};

const MIN_CAR_YEAR = 1980;

interface CreateAdState {
  features: { value: string, category: string }[];
  [key: string]: any;
  manufacturerID: string | null | undefined;
  modelID: string | null | undefined;
  categoryID: string | null | undefined;
  yearLowerBound: number | null;
  yearHigherBound: number | null;
  mileageLowerBound: number | null;
  mileageHigherBound: number | null;
  priceLowerBound: number | null;
  priceHigherBound: number | null;
}

class CreateAd extends Component<MultiProps, CreateAdState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      features: [],
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
  }

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
      if (isDefaultValue || value.isCheckbox || value.value === '0') {
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

  handleChange = (key: string, value: any) => {
    if (key === 'features') {
      this.handleFeaturesChange(value);
    } else if (value.value === '0') {
      this.setState({ [key]: null });
    } else {
      // Not a feature
      // TODO Might need to handle feature deletion
      this.setState({ [key]: value.value });
    }
    if (key === 'manufacturerID') {
      this.handleChange('modelID', {
        value: '0',
      });
    }
  };

  getModelsForManufacturer = (data: any) => {
    const { manufacturerID } = this.state;
    if (manufacturerID && manufacturerID !== '0') {
      const models = data.manufacturers.find(
        (item: any) => item.id === manufacturerID,
      ).models;
      return models;
    }
    return [];
  };

  getCreateAdPayload = () => {
    const {
      manufacturerID,
      modelID,
      categoryID,
      yearLowerBound,
      yearHigherBound,
      mileageLowerBound,
      mileageHigherBound,
      priceLowerBound,
      priceHigherBound,
    } = this.state;
    let features: string[] = [];
    if (this.state.features) {
      features = this.state.features.map(feature => feature.value);
    }

    const data: AdCreateInput = {};
    if (features) data.features = features;
    if (manufacturerID) data.manufacturerID = this.state.manufacturerID;
    if (modelID) data.modelID = this.state.modelID;
    if (categoryID) data.categoryID = this.state.categoryID;
    if (yearLowerBound) data.yearLowerBound = this.state.yearLowerBound;
    if (yearHigherBound) data.yearHigherBound = this.state.yearHigherBound;
    if (mileageLowerBound) {
      data.mileageLowerBound = this.state.mileageLowerBound;
    }
    if (mileageHigherBound) {
      data.mileageHigherBound = this.state.mileageHigherBound;
    }
    if (priceLowerBound) data.priceLowerBound = this.state.priceLowerBound;
    if (priceHigherBound) data.priceHigherBound = this.state.priceHigherBound;
    return { data };
  };

  render() {
    const {
      translations: { carLabel, cars, general, carFeatureCategory, ad },
    } = this.props;
    const { manufacturerID, categoryID } = this.state;
    const unselect = [
      {
        id: '0',
        name: this.props.translations.general.defaultUnselect,
      },
    ];
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
              variables={this.getCreateAdPayload()}
            >
              {(createAd, mutation) => {
                if (mutation.data && mutation.data.createAd) {
                  const adID = mutation.data.createAd.id;
                  Router.push(`/adDetail?id=${adID}`);
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
                            options={unselect.concat(data.manufacturers)}
                            accessor="name"
                            selected={manufacturerID}
                            handleChange={(item: any) =>
                              this.handleChange('manufacturerID', {
                                value: item.id,
                              })
                            }
                            label={
                              <span>
                                {cars.manufacturer}
                                <span style={redAsterixStyle}>*</span>
                              </span>
                            }
                          />
                          <Select
                            options={unselect.concat(
                              this.getModelsForManufacturer(data),
                            )}
                            disabled={!manufacturerID}
                            reset={true}
                            accessor="name"
                            selected={manufacturerID}
                            handleChange={(item: any, reset: true) =>
                              this.handleChange('modelID', { value: item.id })
                            }
                            label={
                              <span>
                                {cars.model}
                                <span style={redAsterixStyle}>*</span>
                              </span>
                            }
                          />
                          <Select
                            options={unselect.concat(data.carCategories)}
                            accessor="name"
                            selected={categoryID}
                            handleChange={(item: any) =>
                              this.handleChange('categoryID', {
                                value: item.id,
                              })
                            }
                            label={
                              <span>
                                {cars.category}
                                <span style={redAsterixStyle}>*</span>
                              </span>
                            }
                          />

                          <label>
                            <span>
                              {cars.year} {general.min}
                              <span style={redAsterixStyle}>*</span>
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.year} ${general.min}`}
                              min={MIN_CAR_YEAR}
                              max={new Date().getFullYear()}
                              onChange={(e: any) =>
                                this.handleChange('yearLowerBound', {
                                  value: parseInt(e.currentTarget.value, 10),
                                })
                              }
                            />
                          </label>

                          <label>
                            <span>
                              {cars.year} {general.max}
                              <span style={redAsterixStyle}>*</span>
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.year} ${general.max}`}
                              min={MIN_CAR_YEAR}
                              max={new Date().getFullYear()}
                              onChange={(e: any) =>
                                this.handleChange('yearHigherBound', {
                                  value: parseInt(e.currentTarget.value, 10),
                                })
                              }
                            />
                          </label>
                          <label>
                            <span>
                              {cars.mileage} {general.min}
                              <span style={redAsterixStyle}>*</span>
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.mileage} ${general.min}`}
                              onChange={(e: any) =>
                                this.handleChange('mileageLowerBound', {
                                  value: parseInt(e.currentTarget.value, 10),
                                })
                              }
                            />
                          </label>
                          <label>
                            <span>
                              {cars.mileage} {general.max}
                              <span style={redAsterixStyle}>*</span>
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.mileage} ${general.max}`}
                              onChange={(e: any) =>
                                this.handleChange('mileageHigherBound', {
                                  value: parseInt(e.currentTarget.value, 10),
                                })
                              }
                            />
                          </label>
                          <label>
                            <span>
                              {cars.price} {general.min}
                              <span style={redAsterixStyle}>*</span>
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.price} ${general.min}`}
                              onChange={(e: any) =>
                                this.handleChange('priceLowerBound', {
                                  value: parseInt(e.currentTarget.value, 10),
                                })
                              }
                            />
                          </label>
                          <label>
                            <span>
                              {cars.price} {general.max}
                              <span style={redAsterixStyle}>*</span>
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.price} ${general.max}`}
                              onChange={(e: any) =>
                                this.handleChange('priceHigherBound', {
                                  value: parseInt(e.currentTarget.value, 10),
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
                              options={unselect.concat(feature.features)}
                              accessor="name"
                              selected={this.state.features[feature]}
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
