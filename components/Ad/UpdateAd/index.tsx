import React, { Component } from 'react';
import StyledForm from '../../Car/CarAdd/Form';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Mutation, Query } from 'react-apollo';
import {
  AdCreateInput,
  CarFeatureCategory,
  Ad,
  AdUpdateInput,
} from '../../../generated/graphql';
import gql from 'graphql-tag';
import { Form, Button, Card } from 'react-bootstrap';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import Select from '../../General/Select';
import Router from 'next/router';
import { GET_FEATURES_QUERY } from '../../Car/CarAdd';
import CreateAdFormValidation from '../../../lib/FormValidator/CreateAdFormValidation';
import { minCarYear, paging5pages } from '../../General/Preferences';
import { PAGE_ADS_QUERY } from '../MyAds/Queries';
import { UPDATE_AD_QUERY } from './Queries';

const UPDATE_AD_MUTATION = gql`
  mutation UPDATE_AD_MUTATION($data: AdUpdateInput!) {
    updateAd(data: $data) {
      id
      priceLowerBound
      priceHigherBound
      manufacturer {
        id
        name
      }
      model {
        id
        name
      }
      category {
        id
        name
      }
      mileageLowerBound
      mileageHigherBound
      yearLowerBound
      yearHigherBound
      features {
        id
        name
        category {
          id
          name
        }
      }
    }
  }
`;

interface UpdateAdFeature {
  value: string;
  category: string;
}

export interface UpdateAdState {
  features: UpdateAdFeature[] | null;
  [key: string]: any;
  priceLowerBound: number | null;
  priceHigherBound: number | null;
  manufacturerID: string | null;
  modelID: string | null;
  categoryID: string | null;
  mileageLowerBound: number | null;
  mileageHigherBound: number | null;
  yearLowerBound: number | null;
  yearHigherBound: number | null;
  id: string | null;
}

class UpdateAd extends Component<MultiProps, UpdateAdState> {
  state: UpdateAdState = {
    features: null,
    manufacturerID: null,
    modelID: null,
    categoryID: null,
    yearLowerBound: 5,
    yearHigherBound: 5,
    mileageLowerBound: 5,
    mileageHigherBound: 5,
    priceLowerBound: 5,
    priceHigherBound: 5,
    id: null,
  };

  handleUpdateAd = async (e: any, updateAd: any) => {
    e.preventDefault();
    const { data } = await updateAd();
    const adID = data.updateAd.id;
    Router.push(`/adDetail?id=${adID}`);
  };

  checkFormValidation = () => {
    return true;
  };

  handleFeaturesChange = (value: any) => {
    const { translations } = this.props;
    const features = this.state.features || [];
    const featureIndex = features.findIndex(
      (feature: any) => feature.category === value.category,
    );

    const featureExists = featureIndex > -1;
    const isDefaultValue =
      value.value === translations.general.none || value.value === '0';

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

  getOptions = (value: any, data: any) => {
    let options = data;
    const unselect = [
      {
        id: '0',
        name: this.props.translations.general.defaultUnselect,
      },
    ];
    if (value) {
      options = unselect.concat(data);
    }
    return options;
  };

  getUpdateAdPayload = () => {
    let features: string[] = [];
    if (this.state.features) {
      features = this.state.features.map(feature => feature.value);
    }
    return {
      data: {
        features,
        manufacturerID: this.state.manufacturerID,
        modelID: this.state.modelID,
        categoryID: this.state.categoryID,
        yearLowerBound: this.state.yearLowerBound,
        yearHigherBound: this.state.yearHigherBound,
        mileageLowerBound: this.state.mileageLowerBound,
        mileageHigherBound: this.state.mileageHigherBound,
        priceLowerBound: this.state.priceLowerBound,
        priceHigherBound: this.state.priceHigherBound,
        id: this.state.id,
      },
    };
  };

  getFeaturesName = (carFeature: any, feature: any) => {
    let features: any[] = [];
    Object.keys(carFeature).map((item: string, i: number) => {
      features.push({
        name: carFeature[item],
        id: feature.features[i].id,
      });
    });
    return features;
  };

  featureHasValue = (featureCategory: CarFeatureCategory) => {
    let featureIndex = -1;
    if (this.state.features) {
      featureIndex = this.state.features.findIndex(
        (feature: UpdateAdFeature) => feature.category === featureCategory.name,
      );
    }

    return featureIndex > -1;
  };

  setInitialAdData = (data: any) => {
    const ad = data.ad;
    this.setState({
      features: ad.features
        ? ad.features.map((f: any) => ({
            value: f.id,
            category: f.category.name,
          }))
        : null,
      manufacturerID: ad.manufacturer ? ad.manufacturer.id : null,
      modelID: ad.model ? ad.model.id : null,
      categoryID: ad.category ? ad.category.id : null,
      yearLowerBound: ad.yearLowerBound,
      yearHigherBound: ad.yearHigherBound,
      mileageLowerBound: ad.mileageLowerBound,
      mileageHigherBound: ad.mileageHigherBound,
      priceLowerBound: ad.priceLowerBound,
      priceHigherBound: ad.priceHigherBound,
      id: ad.id,
    });
  };

  findInitialModel = (data: any) => {
    if (this.state.manufacturerID && this.state.modelID) {
      const currentManufacturer = data.manufacturers.find(
        (m: any) => m.id === this.state.manufacturerID,
      );

      if (currentManufacturer) {
        return currentManufacturer.models.find(
          (m: any) => m.id === this.state.modelID,
        );
      }
    }
    return undefined;
  };

  findInitialFeature = (featureCategory: CarFeatureCategory) => {
    if (this.state.features && this.state.features.length > 0) {
      const feature = this.state.features.find(
        feature => feature.category === featureCategory.name,
      );

      if (feature) {
        return featureCategory.features.find(
          featureChoice => featureChoice.id === feature.value,
        );
      }
    }
  };

  render() {
    const {
      translations: {
        carLabel,
        cars,
        general,
        carFeatureCategory,
        Ads,
        carFeature,
        carCategory,
      },
    } = this.props;
    const { manufacturerID, categoryID, modelID } = this.state;
    let fetchedCheckboxFeatures: any;
    let fetchedDropdownFeatures: any;
    const touched = { ...this.state.touched };
    const createAdFormValidation = new CreateAdFormValidation(general);

    return (
      <Query query={GET_FEATURES_QUERY}>
        {({ loading, error, data }) => {
          if (loading || !data.carFeatureCategories) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          fetchedCheckboxFeatures = data.carFeatureCategories.filter(
            (category: any) => category.type === 'TRUE_FALSE',
          );
          fetchedDropdownFeatures = data.carFeatureCategories.filter(
            (category: any) => category.type === 'MULTIPLE_CHOICE',
          );

          if (!this.state.id) {
            return (
              <Query
                query={UPDATE_AD_QUERY}
                variables={{ id: this.props.query.id }}
                onCompleted={this.setInitialAdData}
                fetchPolicy="network-only"
              >
                {({ loading }) => {
                  if (loading) return <Loading />;
                  return null;
                }}
              </Query>
            );
          }

          return (
            <Mutation
              mutation={UPDATE_AD_MUTATION}
              refetchQueries={[
                {
                  query: PAGE_ADS_QUERY,
                  variables: { pageNumber: 0, pageSize: paging5pages },
                },
              ]}
              variables={this.getUpdateAdPayload()}
            >
              {(updateAd, mutation) => {
                return (
                  <StyledForm onSubmit={e => this.handleUpdateAd(e, updateAd)}>
                    <h1>{Ads.updateAd}</h1>
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
                            selected={data.manufacturers.find(
                              (m: any) => m.id === this.state.manufacturerID,
                            )}
                            handleChange={(item: any) =>
                              this.handleChange('manufacturerID', {
                                value: item.id,
                              })
                            }
                            label={cars.manufacturer}
                          />
                          <Select
                            options={this.getOptions(
                              modelID,
                              this.getModelsForManufacturer(data),
                            )}
                            disabled={!manufacturerID}
                            label={cars.model}
                            accessor="name"
                            selected={this.findInitialModel(data)}
                            reset={true}
                            handleChange={(item: any) =>
                              this.handleChange('modelID', {
                                value: item.id,
                              })
                            }
                          />
                          <Select
                            options={this.getOptions(
                              categoryID,
                              data.carCategories.map((c: any) => ({
                                id: c.id,
                                name: carCategory[c.name],
                              })),
                            )}
                            accessor="name"
                            label={cars.category}
                            selected={
                              this.state.categoryID
                                ? data.carCategories.find(
                                    (c: any) => c.id === this.state.categoryID,
                                  )
                                : undefined
                            }
                            handleChange={(item: any) =>
                              this.handleChange('categoryID', {
                                value: item.id,
                              })
                            }
                          />

                          <label>
                            {Ads.lowerYear}
                            <Form.Control
                              defaultValue={
                                this.state.yearLowerBound
                                  ? this.state.yearLowerBound.toString()
                                  : undefined
                              }
                              type="number"
                              placeholder={`${cars.year} ${general.min}`}
                              min={minCarYear}
                              max={new Date().getFullYear()}
                              isInvalid={
                                this.state.yearLowerBound !== null &&
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
                            {Ads.higherYear}
                            <Form.Control
                              type="number"
                              defaultValue={
                                this.state.yearHigherBound
                                  ? this.state.yearHigherBound.toString()
                                  : undefined
                              }
                              placeholder={`${cars.year} ${general.max}`}
                              min={minCarYear}
                              max={new Date().getFullYear()}
                              isInvalid={
                                this.state.yearHigherBound !== null &&
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
                            {Ads.lowerMileage}
                            <Form.Control
                              type="number"
                              defaultValue={
                                this.state.mileageLowerBound
                                  ? this.state.mileageLowerBound.toString()
                                  : undefined
                              }
                              placeholder={`${cars.mileage} ${general.min}`}
                              isInvalid={
                                this.state.mileageLowerBound !== null &&
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
                            {Ads.higherMileage}
                            <Form.Control
                              type="number"
                              defaultValue={
                                this.state.mileageHigherBound
                                  ? this.state.mileageHigherBound.toString()
                                  : undefined
                              }
                              placeholder={`${cars.mileage} ${general.max}`}
                              isInvalid={
                                this.state.mileageHigherBound !== null &&
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
                            {Ads.lowerPrice}
                            <Form.Control
                              type="number"
                              defaultValue={
                                this.state.priceLowerBound
                                  ? this.state.priceLowerBound.toString()
                                  : undefined
                              }
                              placeholder={`${cars.price} ${general.min}`}
                              isInvalid={
                                this.state.priceLowerBound !== null &&
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
                            {Ads.higherPrice}
                            <Form.Control
                              type="number"
                              defaultValue={
                                this.state.priceHigherBound
                                  ? this.state.priceHigherBound.toString()
                                  : undefined
                              }
                              placeholder={`${cars.price} ${general.max}`}
                              isInvalid={
                                this.state.priceHigherBound !== null &&
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
                            (featureCategory: any) => (
                              <Select
                                key={featureCategory.id}
                                options={this.getOptions(
                                  this.featureHasValue(featureCategory),
                                  this.getFeaturesName(
                                    carFeature[featureCategory.name],
                                    featureCategory,
                                  ),
                                )}
                                accessor="name"
                                selected={this.findInitialFeature(
                                  featureCategory,
                                )}
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
                              defaultChecked={
                                this.findInitialFeature(feature) ? true : false
                              }
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
                            <span className="card-number">4</span>
                            {general.submit}
                          </Card.Title>
                          <Button
                            variant="primary"
                            className="formSubmit"
                            type="submit"
                            disabled={
                              !createAdFormValidation.isCreateAdFormStateValid(
                                this.state,
                              ) || !this.checkFormValidation()
                            }
                          >
                            {general.options.modify}
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
export default multi(UpdateAd);
