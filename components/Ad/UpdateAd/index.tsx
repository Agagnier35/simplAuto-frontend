import React, { Component } from 'react';
import StyledForm from '../../Car/CarAdd/Form';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Mutation, Query } from 'react-apollo';
import { AdUpdateInput, CarFeatureCategory } from '../../../generated/graphql';
import gql from 'graphql-tag';
import { Form, Button, Card } from 'react-bootstrap';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import Select from '../../General/Select';
import Router from 'next/router';
import { GET_FEATURES_QUERY } from '../../Car/CarAdd';
import { Dictionary } from '../../../lib/Types/Dictionary';
import CreateAdFormValidation from '../../../lib/FormValidator/CreateAdFormValidation';
import { minCarYear, paging5pages } from '../../General/Preferences';
import { AD_DETAIL_QUERY } from '../AdDetail/Queries';
import { PAGE_ADS_QUERY } from '../MyAds/Queries';

const UPDATE_AD_MUTATION = gql`
  mutation UPDATE_AD_MUTATION($data: AdUpdateInput!) {
    updateAd(data: $data) {
      id
    }
  }
`;

export interface UpdateAdState extends Dictionary<AdUpdateInput> {
  id: string;
  priceLowerBound: number | null;
  priceHigherBound: number | null;
  manufacturerID: string | null;
  modelID: string | null;
  categoryID: string | null;
  mileageLowerBound: number | null;
  mileageHigherBound: number | null;
  yearLowerBound: number | null;
  yearHigherBound: number | null;
  features: string[] | null;
  touched: Dictionary<{
    yearLowerBound: boolean;
    yearHigherBound: boolean;
    mileageLowerBound: boolean;
    mileageHigherBound: boolean;
    priceLowerBound: boolean;
    priceHigherBound: boolean;
  }>;
}

interface UpdateAdProps extends MultiProps {
  adId: string;
}

class UpdateAd extends Component<UpdateAdProps, UpdateAdState> {
  state: UpdateAdState = {
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
    touched: {
      yearLowerBound: false,
      yearHigherBound: false,
      mileageLowerBound: false,
      mileageHigherBound: false,
      priceLowerBound: false,
      priceHigherBound: false,
    },
  };

  updateState = (adDetail: any) => {
    this.state.id = adDetail.id;
  };

  handleUpdateAd = async (e: any, updateAd: any) => {
    e.preventDefault();
    await updateAd();
  };

  getFeature = (adFeature: any[], everyFeature: any[]) => {
    let itemSelected = undefined;
    everyFeature.map((oneFeature: any) => {
      adFeature.map((myFeature: any) => {
        if (myFeature.id === oneFeature.id) {
          itemSelected = oneFeature;
        }
      });
    });
    return itemSelected;
  };

  getFeaturesName = (carFeature: any, feature: any) => {
    let features: any[] = [];
    const unselect = [
      {
        id: '0',
        name: this.props.translations.general.defaultUnselect,
      },
    ];
    Object.keys(carFeature).map((item: string, i: number) => {
      features.push({
        name: carFeature[item],
        id: feature.features[i].id,
      });
    });
    return unselect.concat(features);
  };

  checkFormValidation = () => {
    let isValid = false;
    Object.keys(this.state).map(item => {
      if (
        item !== 'touched' &&
        this.state[item] &&
        this.state[item].length !== 0
      ) {
        isValid = true;
      }
    });
    return isValid;
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
            value.value,
            ...features.slice(featureIndex + 1),
          ],
        });
      }
    }
    // Add it
    else if (!isDefaultValue) {
      this.setState({
        features: [...features, value.value],
      });
    }
  };

  handleChange = (key: string, value: any) => {
    if (key === 'features') {
      this.handleFeaturesChange(value);
    } else {
      // Not a feature
      // TODO Might need to handle feature deletion
      this.setState({ [key]: value.value });
      if (key === 'manufacturerID') {
        this.setState({ modelID: '' });
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

  fieldTouched = (key: string) => {
    const touched = { ...this.state.touched };
    touched[key] = true;
    this.setState({ touched });
  };

  getUpdateAdPayload = () => {
    const { touched, ...data } = this.state;
    const item: AdUpdateInput = data;
    return { data: item };
  };

  render() {
    const {
      translations: {
        carLabel,
        cars,
        general,
        carFeatureCategory,
        ad,
        carFeature,
      },
      adId,
    } = this.props;

    const { manufacturerID } = this.state;
    let fetchedCheckboxFeatures: any;
    let fetchedDropdownFeatures: any;
    const touched = { ...this.state.touched };
    const createAdFormValidation = new CreateAdFormValidation(general);
    return (
      <Query query={AD_DETAIL_QUERY} variables={{ id: adId }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          const adDetail = data.ad;
          this.updateState(adDetail);
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
                    refetchQueries={[
                      {
                        query: PAGE_ADS_QUERY,
                        variables: { pageNumber: 0, pageSize: paging5pages },
                      },
                    ]}
                    variables={this.getUpdateAdPayload()}
                  >
                    {(updateAd, mutation) => {
                      if (mutation.data && mutation.data.createAd) {
                        const adID = mutation.data.createAd.id;
                        Router.push(`/adDetail?id=${adID}`);
                      }
                      return (
                        <StyledForm
                          onSubmit={e => this.handleUpdateAd(e, updateAd)}
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
                                  defaultValue={adDetail.manufacturer}
                                />
                                <Select
                                  options={this.getModelsForManufacturer(data)}
                                  disabled={!this.state.manufacturerID}
                                  accessor="name"
                                  selected={manufacturerID}
                                  handleChange={(item: any) =>
                                    this.handleChange('modelID', {
                                      value: item.id,
                                    })
                                  }
                                  defaultValue={adDetail.model}
                                />
                                <Select
                                  options={data.carCategories}
                                  accessor="name"
                                  handleChange={(item: any) =>
                                    this.handleChange('categoryID', {
                                      value: item.id,
                                    })
                                  }
                                  defaultValue={adDetail.category}
                                />

                                <label>
                                  <Form.Control
                                    type="number"
                                    placeholder={`${cars.year} ${general.min}`}
                                    min={minCarYear}
                                    max={new Date().getFullYear()}
                                    defaultValue={adDetail.yearLowerBound}
                                    onBlur={() =>
                                      this.fieldTouched('yearLowerBound')
                                    }
                                    isInvalid={
                                      touched.yearLowerBound &&
                                      !createAdFormValidation.isYearLowerBoundValid(
                                        this.state.yearLowerBound,
                                      )
                                    }
                                    onChange={(e: any) =>
                                      this.handleChange('yearLowerBound', {
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
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
                                  <Form.Control
                                    type="number"
                                    placeholder={`${cars.year} ${general.max}`}
                                    min={minCarYear}
                                    max={new Date().getFullYear()}
                                    defaultValue={adDetail.yearHigherBound}
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
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
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
                                  <Form.Control
                                    type="number"
                                    placeholder={`${cars.mileage} ${
                                      general.min
                                    }`}
                                    defaultValue={adDetail.mileageLowerBound}
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
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
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
                                  <Form.Control
                                    type="number"
                                    placeholder={`${cars.mileage} ${
                                      general.max
                                    }`}
                                    defaultValue={adDetail.mileageHigherBound}
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
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
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
                                  <Form.Control
                                    type="number"
                                    placeholder={`${cars.price} ${general.min}`}
                                    defaultValue={adDetail.priceLowerBound}
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
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
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
                                  <Form.Control
                                    type="number"
                                    placeholder={`${cars.price} ${general.max}`}
                                    defaultValue={adDetail.priceHigherBound}
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
                                        value: parseInt(
                                          e.currentTarget.value,
                                          10,
                                        ),
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
                                      options={this.getFeaturesName(
                                        carFeature[featureCategory.name],
                                        featureCategory,
                                      )}
                                      accessor="name"
                                      defaultValue={this.getFeature(
                                        adDetail.features,
                                        featureCategory.features,
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
                                <div>
                                  {fetchedCheckboxFeatures.map(
                                    (feature: any) => (
                                      <Form.Check
                                        key={feature.id}
                                        type="checkbox"
                                        label={carFeatureCategory[feature.name]}
                                        defaultChecked={this.getFeature(
                                          adDetail.features,
                                          feature.features,
                                        )}
                                        onClick={() =>
                                          this.handleChange('features', {
                                            value: feature.features[0].id,
                                            category: feature.name,
                                            isCheckbox: true,
                                          })
                                        }
                                      />
                                    ),
                                  )}
                                </div>
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
export default multi(UpdateAd);
