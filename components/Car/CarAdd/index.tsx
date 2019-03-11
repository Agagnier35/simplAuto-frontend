import React, { Component } from 'react';
import StyledForm from './Form';
import { multi, MultiProps } from '../../../lib/MultiLang';
import Carousel from './Carousel';
import { Mutation, Query } from 'react-apollo';
import { CarCreateInput, Maybe } from '../../../generated/graphql';
import gql from 'graphql-tag';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import Select from '../../General/Select';
import Router from 'next/router';
import CarAddFormValidation from '../../General/FormValidator/CarAddFormValidation';

interface CarAddState {
  features: any[];
  [key: string]: any;
  manufacturerID: any;
  modelID: any;
  categoryID: any;
  year: number;
  mileage: number;
  photos: any;
  featuresIDs?: Maybe<string[]>;
  touched: {
    manufacturerID: boolean;
    modelID: boolean;
    categoryID: boolean;
    year: boolean;
    mileage: boolean;
  };
}

export const GET_FEATURES_QUERY = gql`
  query {
    carFeatureCategories {
      id
      name
      type
      features {
        id
        name
      }
    }
    manufacturers {
      id
      name
      models {
        id
        name
      }
    }
    carCategories {
      id
      name
    }
  }
`;

const CAR_ADD_MUTATION = gql`
  mutation CAR_ADD_MUTATION($data: CarCreateInput!) {
    createCar(data: $data) {
      id
    }
  }
`;

const redAsterixStyle = {
  color: 'red',
};

class CarAdd extends Component<MultiProps, CarAddState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      photos: [],
      features: [],
      manufacturerID: null,
      modelID: null,
      categoryID: null,
      year: 0,
      mileage: 0,
      featuresIDs: null,
      touched: {
        manufacturerID: false,
        modelID: false,
        categoryID: false,
        year: false,
        mileage: false,
      },
    };

    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handlePictureChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const photos = this.getURLsFromCloud(files);
      this.setState({ photos });
    } else {
      this.setState({
        photos: [],
      });
    }
  }

  getURLsFromCloud = async (files: any) => {
    const photos = [];

    const firstSevenFiles = Array.from(files).slice(0, 7);
    let i = 0;
    for (const _ in firstSevenFiles) {
      const data = new FormData();
      data.append('file', firstSevenFiles[i] as any);
      data.append('upload_preset', 'Car Image');
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/simplauto/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );
      const photoURL = await res.json();
      photos.push(photoURL.secure_url);
      i += 1;
    }
    this.setState({ photos });
  };

  handleCreateCar = async (e: any, createCar: any) => {
    e.preventDefault();
    await createCar();
  };

  handleInputChange = (e: any) => {
    this.setState({ [e.target.id]: Number(e.target.value) });
  };

  handleChange = (key: string, value: any) => {
    const { translations } = this.props;
    const features = this.state.features;

    if (key === 'features') {
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
    } else {
      // Not a feature
      this.setState({ [key]: value });
    }
  };

  getCreateCarPayload = () => {
    const featuresIDs = this.state.features.map(feature => feature.value);
    const data: CarCreateInput = {
      featuresIDs,
      manufacturerID: this.state.manufacturerID,
      modelID: this.state.modelID,
      categoryID: this.state.categoryID,
      year: this.state.year,
      mileage: this.state.mileage,
      photos: this.state.photos,
    };
    return { data };
  };

  getModelsForManufacturer = (data: any) => {
    const { manufacturerID } = this.state;
    if (manufacturerID) {
      return data.manufacturers.find((item: any) => item.id === manufacturerID)
        .models;
    }
    return [];
  };

  render() {
    const {
      translations: { carLabel, cars, general, carFeatureCategory },
    } = this.props;
    const { manufacturerID } = this.state;
    let fetchedCheckboxFeatures: any;
    let fetchedDropdownFeatures: any;

    const carAddFormValidation = new CarAddFormValidation(general);
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
              mutation={CAR_ADD_MUTATION}
              variables={this.getCreateCarPayload()}
            >
              {(createCar, mutation) => {
                if (mutation.data && mutation.data.createCar) {
                  const carID = mutation.data.createCar.id;
                  Router.push(`/car?id=${carID}`);
                }
                return (
                  <StyledForm
                    onSubmit={e => this.handleCreateCar(e, createCar)}
                  >
                    <h1>{carLabel.title}</h1>
                    <ErrorMessage error={mutation.error} />
                    <Card>
                      <Card.Body>
                        <Card.Title>
                          <span className="card-number">1</span>
                          {carLabel.general}
                        </Card.Title>
                        <div className="label-wrapper">
                          <InputGroup>
                            <Select
                              options={data.manufacturers}
                              accessor="name"
                              handleChange={(item: any) =>
                                this.handleChange('manufacturerID', item.id)
                              }
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
                                this.handleChange('modelID', item.id)
                              }
                              label={
                                <span>
                                  {cars.model}
                                  <span style={redAsterixStyle}>*</span>
                                </span>
                              }
                            />
                          </InputGroup>
                          <InputGroup>
                            <Select
                              options={data.carCategories}
                              accessor="name"
                              handleChange={(item: any) =>
                                this.handleChange('categoryID', item.id)
                              }
                              label={
                                <span>
                                  {cars.category}
                                  <span style={redAsterixStyle}>*</span>
                                </span>
                              }
                            />
                          </InputGroup>
                          <label>
                            {
                              <span>
                                {cars.year}
                                <span style={redAsterixStyle}>*</span>
                              </span>
                            }
                            <Form.Control
                              type="number"
                              id="year"
                              min={1900}
                              max={new Date().getFullYear()}
                              placeholder={cars.year}
                              onChange={this.handleInputChange}
                              onBlur={() => (this.state.touched.year = true)}
                              isInvalid={
                                this.state.touched.year &&
                                !carAddFormValidation.isYearValid(
                                  this.state.year,
                                )
                              }
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {carAddFormValidation.yearError(this.state.year)}
                            </Form.Control.Feedback>{' '}
                          </label>
                          <label>
                            {
                              <span>
                                {cars.mileage}
                                <span style={redAsterixStyle}>*</span>
                              </span>
                            }
                            <Form.Control
                              type="number"
                              id="mileage"
                              min={0}
                              max={300000}
                              placeholder={cars.mileage}
                              onChange={this.handleInputChange}
                              onBlur={() => (this.state.touched.mileage = true)}
                              isInvalid={
                                this.state.touched.mileage &&
                                !carAddFormValidation.isMileageValid(
                                  this.state.mileage,
                                )
                              }
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {carAddFormValidation.mileageError(
                                this.state.mileage,
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
                              label={carFeatureCategory[feature.name]}
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
                            <span className="card-number">4</span>
                            <span>
                              {general.images}{' '}
                              <span style={redAsterixStyle}>*</span>
                            </span>
                          </Card.Title>
                          <Card.Subtitle>{carLabel.upload}</Card.Subtitle>
                          <label className="btn btn-primary file-select">
                            {carLabel.uploadBtn}
                            <input
                              id="photos"
                              type="file"
                              accept="x-png,image/jpeg"
                              multiple
                              onChange={this.handlePictureChange}
                            />
                          </label>
                          <div className="carousel">
                            <Carousel items={this.state.photos} />
                          </div>
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
                            disabled={
                              !carAddFormValidation.isCarAddFormStateValid(
                                this.state,
                              )
                            }
                          >
                            {carLabel.carAddSumbit}
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
export default multi(CarAdd);
