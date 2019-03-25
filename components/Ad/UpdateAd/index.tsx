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
import { AD_DETAIL_QUERY } from '../AdDetail/Queries';
import CreateAdFormValidation, {
  MINCARYEAR,
  MAXMILEAGEALLOWED,
} from '../../../lib/FormValidator/CreateAdFormValidation';

const UPDATE_AD_MUTATION = gql`
  mutation UPDATE_AD_MUTATION($data: AdUpdateInput!) {
    updateAd(data: $data) {
      id
    }
  }
`;

const redAsterixStyle = {
  color: 'red',
};

interface UpdateAdState extends AdUpdateInput {
  touched: Dictionnary<{
    yearLowerBound: boolean;
    yearHigherBound: boolean;
    mileageLowerBound: boolean;
    mileageHigherBound: boolean;
    priceLowerBound: boolean;
    priceHigherBound: boolean;
  }>;
}

type KeyValue = { [key: string]: any };
type Dictionnary<T> = T & KeyValue;

class UpdateLogin extends Component<MultiProps, Dictionnary<AdUpdateInput>> {
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

  fillState = (data: any) => {
    if (this.isFirstRender) {
      const featuresIds = data.ad.features.map((ft: any) => ft.id);
      this.setState({
        id: data.ad.id,
        features: featuresIds,
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

  fieldToString = (field: number | null | undefined) => {
    if (!field) {
      return '';
    }

    return field.toString();
  };

  getDefaultManufacturer = (manufacturers: any) => {
    const manufacturer = manufacturers.find(
      (mnf: any) => mnf.id === this.state.manufacturerID,
    );
    return manufacturer;
  };

  getDefaultModel = (manufacturers: any) => {
    const model = this.getDefaultManufacturer(manufacturers).models.find(
      (mdl: any) => mdl.id === this.state.modelID,
    );
    return model;
  };

  getDefaultCategory = (carCategories: any) => {
    const carCategory = carCategories.find(
      (carCtg: any) => carCtg.id === this.state.categoryID,
    );
    return carCategory;
  };

  getDefaultFeature = (features: any) => {
    let defaultFeature = undefined;
    features.map((ft1: any) => {
      if (this.state.features) {
        this.state.features.map((ft2: any) => {
          ft2 === ft1.id ? (defaultFeature = ft1) : null;
        });
      } else {
        defaultFeature = undefined;
      }
    });

    return defaultFeature;
  };

  isFeatureChecked = () => {
    return false;
  };

  fieldTouched = (key: string) => {
    const touched = { ...this.state.touched };
    touched[key] = true;
    this.setState({ touched });
  };

  getPayload = () => {
    const { touched, ...rest } = this.state;
    return rest;
  };

  render() {
    const {
      translations: { carLabel, cars, general, carFeatureCategory, ad },
    } = this.props;
    const { manufacturerID } = this.state;
    let fetchedCheckboxFeatures: any;
    let fetchedDropdownFeatures: any;
    const touched = { ...this.state.touched };
    const createAdFormValidation = new CreateAdFormValidation(general); // Réutilisation du même que pour créer car le contrôle se fait exactement de la même faço
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
                    variables={{ data: this.getPayload() }}
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
                                  defaultValue={this.getDefaultManufacturer(
                                    data.manufacturers,
                                  )}
                                  label={
                                    <span>
                                      {cars.manufacturer}
                                      <span style={redAsterixStyle}>*</span>
                                    </span>
                                  }
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
                                  defaultValue={this.getDefaultModel(
                                    data.manufacturers,
                                  )}
                                  label={
                                    <span>
                                      {cars.model}
                                      <span style={redAsterixStyle}>*</span>
                                    </span>
                                  }
                                />
                                <Select
                                  options={data.carCategories}
                                  accessor="name"
                                  handleChange={(item: any) =>
                                    this.handleChange('categoryID', {
                                      value: item.id,
                                    })
                                  }
                                  defaultValue={this.getDefaultCategory(
                                    data.carCategories,
                                  )}
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
                                    type="text"
                                    placeholder={`${cars.year} ${general.min}`}
                                    defaultValue={this.fieldToString(
                                      this.state.yearLowerBound,
                                    )}
                                    min={MINCARYEAR}
                                    max={new Date().getFullYear()}
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
                                  <span>
                                    {cars.year} {general.max}
                                    <span style={redAsterixStyle}>*</span>
                                  </span>
                                  <Form.Control
                                    type="text"
                                    placeholder={`${cars.year} ${general.max}`}
                                    defaultValue={this.fieldToString(
                                      this.state.yearHigherBound,
                                    )}
                                    min={MINCARYEAR}
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
                                  <span>
                                    {cars.mileage} {general.min}
                                    <span style={redAsterixStyle}>*</span>
                                  </span>
                                  <Form.Control
                                    type="text"
                                    placeholder={`${cars.mileage} ${
                                      general.min
                                    }`}
                                    defaultValue={this.fieldToString(
                                      this.state.mileageLowerBound,
                                    )}
                                    min={0}
                                    max={MAXMILEAGEALLOWED}
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
                                  <span>
                                    {cars.mileage} {general.max}
                                    <span style={redAsterixStyle}>*</span>
                                  </span>
                                  <Form.Control
                                    type="text"
                                    placeholder={`${cars.mileage} ${
                                      general.max
                                    }`}
                                    defaultValue={this.fieldToString(
                                      this.state.mileageHigherBound,
                                    )}
                                    min={0}
                                    max={MAXMILEAGEALLOWED}
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
                                  <span>
                                    {cars.price} {general.min}
                                    <span style={redAsterixStyle}>*</span>
                                  </span>
                                  <Form.Control
                                    type="text"
                                    placeholder={`${cars.price} ${general.min}`}
                                    defaultValue={this.fieldToString(
                                      this.state.priceLowerBound,
                                    )}
                                    min={0}
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
                                  <span>
                                    {cars.price} {general.max}
                                    <span style={redAsterixStyle}>*</span>
                                  </span>
                                  <Form.Control
                                    type="text"
                                    placeholder={`${cars.price} ${general.max}`}
                                    defaultValue={this.fieldToString(
                                      this.state.priceHigherBound,
                                    )}
                                    min={0}
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
                                    // ------------------------------
                                    // DEFAULT FEATURES
                                    // ------------------------------
                                    defaultValue={this.getDefaultFeature(
                                      feature.features,
                                    )}
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
                                    // ------------------------------
                                    // DEFAULT FEATURES
                                    // ------------------------------
                                    // isChecked
                                    defaultChecked={this.isFeatureChecked()}
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
