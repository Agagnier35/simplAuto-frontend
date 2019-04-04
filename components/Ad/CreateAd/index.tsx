import React, { Component } from 'react';
import StyledForm from '../../Car/CarAdd/Form';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Mutation, Query } from 'react-apollo';
import { AdCreateInput, CarFeatureCategory } from '../../../generated/graphql';
import gql from 'graphql-tag';
import { Form, Button, Card } from 'react-bootstrap';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import Select from '../../General/Select';
import Router from 'next/router';
import { GET_FEATURES_QUERY } from '../../Car/CarAdd';
import { Dictionary } from '../../../lib/Types/Dictionary';
import { minCarYear } from '../../General/Preferences';
import CreateAdFormValidation from '../../../lib/FormValidator/CreateAdFormValidation';

const CREATE_ADD_MUTATION = gql`
  mutation CREATE_ADD_MUTATION($data: AdCreateInput!) {
    createAd(data: $data) {
      id
    }
  }
`;

class CreateAd extends Component<MultiProps, Dictionary<AdCreateInput>> {
  state: Dictionary<AdCreateInput> = {
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
    touched: {
      yearLowerBound: false,
      yearHigherBound: false,
      mileageLowerBound: false,
      mileageHigherBound: false,
      priceLowerBound: false,
      priceHigherBound: false,
    },
  };
const redAsterixStyle = {
  color: 'red',
};

const MIN_CAR_YEAR = 1980;
interface CreateAdFeature {
  value: string;
  category: string;
}

interface CreateAdState {
  features: CreateAdFeature[];
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

  checkFormValidation = () => {
    let isValid = false;
    Object.keys(this.state).map(item => {
      if (this.state[item] !== null) {
        isValid = true;
      }
    });
    return isValid;
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

  render() {
    const {
      translations: { carLabel, cars, general, carFeatureCategory, ad },
    } = this.props;
    const { manufacturerID, categoryID, modelID, features } = this.state;
    let fetchedCheckboxFeatures: any;
    let fetchedDropdownFeatures: any;
    const touched = { ...this.state.touched };
    const createAdFormValidation = new CreateAdFormValidation(general);
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
                            options={this.getOptions(
                              manufacturerID,
                              data.manufacturers,
                            )}
                            accessor="name"
                            selected={manufacturerID}
                            handleChange={(item: any) =>
                              this.handleChange('manufacturerID', {
                                value: item.id,
                              })
                            }
                            label={<span>{cars.manufacturer}</span>}
                          />
                          <Select
                            options={this.getOptions(
                              modelID,
                              this.getModelsForManufacturer(data),
                            )}
                            disabled={!manufacturerID}
                            reset={true}
                            accessor="name"
                            selected={manufacturerID}
                            handleChange={(item: any, reset: true) =>
                              this.handleChange('modelID', { value: item.id })
                            }
                            label={<span>{cars.model}</span>}
                          />
                          <Select
                            options={this.getOptions(
                              categoryID,
                              data.carCategories,
                            )}
                            accessor="name"
                            selected={categoryID}
                            handleChange={(item: any) =>
                              this.handleChange('categoryID', {
                                value: item.id,
                              })
                            }
                            label={<span>{cars.category}</span>}
                          />

                          <label>
                            <span>
                              {cars.year} {general.min}
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.year} ${general.min}`}
                              min={minCarYear}
                              max={new Date().getFullYear()}
                              onBlur={() => this.fieldTouched('yearLowerBound')}
                              isInvalid={
                                touched.yearLowerBound &&
                                !createAdFormValidation.isYearLowerBoundValid(
                                  this.state.yearLowerBound,
                                )
                              }
                              onChange={(e: any) =>
                                this.handleChange('yearLowerBound', {
                                  value: parseInt(e.currentTarget.value, 10),
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {createAdFormValidation.yearLowerBoundError(
                                this.state.yearLowerBound,
                              )}
                            </Form.Control.Feedback>{' '}
                          </label>

                          <label>
                            <span>
                              {cars.year} {general.max}
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.year} ${general.max}`}
                              min={minCarYear}
                              max={new Date().getFullYear()}
                              onBlur={() =>
                                this.fieldTouched('yearHigherBound')
                              }
                              isInvalid={
                                touched.yearHigherBound &&
                                !createAdFormValidation.isYearHigherBoundValid(
                                  this.state.yearLowerBound,
                                  this.state.yearHigherBound,
                                )
                              }
                              onChange={(e: any) =>
                                this.handleChange('yearHigherBound', {
                                  value: parseInt(e.currentTarget.value, 10),
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {createAdFormValidation.yearHigherBoundError(
                                this.state.yearLowerBound,
                                this.state.yearHigherBound,
                              )}
                            </Form.Control.Feedback>{' '}
                          </label>
                          <label>
                            <span>
                              {cars.mileage} {general.min}
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.mileage} ${general.min}`}
                              onBlur={() =>
                                this.fieldTouched('mileageLowerBound')
                              }
                              isInvalid={
                                touched.mileageLowerBound &&
                                !createAdFormValidation.isMileageLowerBoundValid(
                                  this.state.mileageLowerBound,
                                )
                              }
                              onChange={(e: any) =>
                                this.handleChange('mileageLowerBound', {
                                  value: parseInt(e.currentTarget.value, 10),
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {createAdFormValidation.mileageLowerBoundError(
                                this.state.mileageLowerBound,
                              )}
                            </Form.Control.Feedback>{' '}
                          </label>
                          <label>
                            <span>
                              {cars.mileage} {general.max}
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.mileage} ${general.max}`}
                              onBlur={() =>
                                this.fieldTouched('mileageHigherBound')
                              }
                              isInvalid={
                                touched.mileageHigherBound &&
                                !createAdFormValidation.isMileageHigherBoundValid(
                                  this.state.mileageLowerBound,
                                  this.state.mileageHigherBound,
                                )
                              }
                              onChange={(e: any) =>
                                this.handleChange('mileageHigherBound', {
                                  value: parseInt(e.currentTarget.value, 10),
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {createAdFormValidation.mileageHigherBoundError(
                                this.state.mileageLowerBound,
                                this.state.mileageHigherBound,
                              )}
                            </Form.Control.Feedback>{' '}
                          </label>
                          <label>
                            <span>
                              {cars.price} {general.min}
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.price} ${general.min}`}
                              onBlur={() =>
                                this.fieldTouched('priceLowerBound')
                              }
                              isInvalid={
                                touched.priceLowerBound &&
                                !createAdFormValidation.isPriceLowerBoundValid(
                                  this.state.priceLowerBound,
                                )
                              }
                              onChange={(e: any) =>
                                this.handleChange('priceLowerBound', {
                                  value: parseInt(e.currentTarget.value, 10),
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {createAdFormValidation.priceLowerBoundError(
                                this.state.priceLowerBound,
                              )}
                            </Form.Control.Feedback>{' '}
                          </label>
                          <label>
                            <span>
                              {cars.price} {general.max}
                            </span>
                            <Form.Control
                              type="number"
                              placeholder={`${cars.price} ${general.max}`}
                              onBlur={() =>
                                this.fieldTouched('priceHigherBound')
                              }
                              isInvalid={
                                touched.priceHigherBound &&
                                !createAdFormValidation.isPriceHigherBoundValid(
                                  this.state.priceLowerBound,
                                  this.state.priceHigherBound,
                                )
                              }
                              onChange={(e: any) =>
                                this.handleChange('priceHigherBound', {
                                  value: parseInt(e.currentTarget.value, 10),
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {createAdFormValidation.priceHigherrBoundError(
                                this.state.priceLowerBound,
                                this.state.priceHigherBound,
                              )}
                            </Form.Control.Feedback>{' '}
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
                          {fetchedDropdownFeatures.map(
                            (featureCategory: CarFeatureCategory) => (
                              <Select
                                key={featureCategory.id}
                                options={this.getOptions(
                                  this.featureHasValue(featureCategory),
                                  featureCategory.features,
                                )}
                                accessor="name"
                                handleChange={(item: any) =>
                                  this.handleChange('features', {
                                    value: item.id,
                                    category: featureCategory.name,
                                  })
                                }
                                label={`${
                                  carFeatureCategory[featureCategory.name]
                                } :`}
                              />
                            ),
                          )}
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
                            disabled={!this.checkFormValidation()}
                            variant="primary"
                            className="formSubmit"
                            type="submit"
                            disabled={
                              !createAdFormValidation.isCreateAdFormStateValid(
                                this.state,
                              )
                            }
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
