import React, { Component } from 'react';
import StyledForm from './Form';
import { multi, MultiProps } from '../../../lib/MultiLang';
import Carousel from './Carousel';
import { Mutation, Query } from 'react-apollo';
import { CarCreateInput, Maybe } from '../../../generated/graphql';
import gql from 'graphql-tag';
import { Form, Button, Card } from 'react-bootstrap';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import Select from '../../General/Select';
import Router from 'next/router';

interface CarAddState {
  features: any[];
  [key: string]: any;
  manufacturerID: string;
  modelID: string;
  categoryID: string;
  year: number;
  description: string;
  mileage: number;
  photos: any;
  featuresIDs?: Maybe<string[]>;
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

class CarAdd extends Component<MultiProps, CarAddState> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      photos: [],
      features: [],
      manufacturerID: '',
      modelID: '',
      categoryID: '',
      year: 0,
      mileage: 0,
      description: '',
      featuresIDs: null,
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
    if (e.target.id === 'year' || e.target.id === 'mileage') {
      this.setState({ [e.target.id]: Number(e.target.value) });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
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
      if (key === 'manufacturerID') {
        this.setState({ modelID: '' });
      }
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
      description: this.state.description,
      photos: this.state.photos,
    };
    return { data };
  };

  getModelsForManufacturer = (data: any) => {
    const { manufacturerID } = this.state;
    return manufacturerID.length > 0
      ? data.manufacturers.find((item: any) => item.id === manufacturerID)
          .models
      : [];
  };

  render() {
    const {
      translations: { carLabel, cars, general, carFeatureCategory },
    } = this.props;
    const { manufacturerID } = this.state;
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
                          <Select
                            options={data.manufacturers}
                            accessor="name"
                            handleChange={(item: any) =>
                              this.handleChange('manufacturerID', item.id)
                            }
                            label={`${cars.manufacturer} :`}
                          />
                          <Select
                            options={this.getModelsForManufacturer(data)}
                            disabled={manufacturerID.length === 0}
                            accessor="name"
                            selected={manufacturerID}
                            handleChange={(item: any) =>
                              this.handleChange('modelID', item.id)
                            }
                            label={`${cars.model} :`}
                          />
                          <Select
                            options={data.carCategories}
                            accessor="name"
                            handleChange={(item: any) =>
                              this.handleChange('categoryID', item.id)
                            }
                            label={`${cars.category} :`}
                          />

                          <label>
                            {cars.year}
                            <Form.Control
                              type="text"
                              id="year"
                              placeholder={cars.year}
                              onChange={this.handleInputChange}
                              required
                            />
                          </label>
                          <label>
                            {cars.mileage}
                            <Form.Control
                              type="text"
                              id="mileage"
                              placeholder={cars.mileage}
                              onChange={this.handleInputChange}
                              required
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
                          <span>Description :</span>
                          <textarea
                            id="description"
                            cols={50}
                            rows={2}
                            placeholder={cars.descriptionPlaceholder}
                            onChange={this.handleInputChange}
                          />
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
                            {general.images}
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
