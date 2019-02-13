import React, { Component } from 'react';
import Form from './Form';
import { multi, MultiProps } from '../../lib/MultiLang';
import Carousel from './Carousel';
import Categories from './CarCategories';
import Manufacturers from './CarManufacturers';
import Models from './CarModels';
import DropdownFeatures from './DropdownFeatures';
import CheckboxFeatures from './CheckboxFeatures';
import { Mutation, Query } from 'react-apollo';
import { CarCreateInput } from '../../generated/graphql';
import gql from 'graphql-tag';
import { Table } from 'react-bootstrap';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
export type Maybe<T> = T | null;

interface CarAddState {
  features: any[];
  [key: string]: any;
  manufacturerID: string;
  modelID: string;
  categoryID: string;
  year: number;
  mileage: number;
  photos: any;
  featuresIDs?: Maybe<string[]>;
}

const GET_FEATURES_QUERY = gql`
query{
    carFeatureCategories{
        id
        name
        type
        features {
            id
            name
        }

    }
}`;

const CARADD_MUTATION = gql`
  mutation CARADD_MUTATION($data: CarCreateInput!) {
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
      featuresIDs: null,
    };

    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handlePictureChange(event: any) {
    const { translations } = this.props;
    const files = event.target.files;
    if (files.length <= 7 && files.length > 0) {
      const tempURLs = Array.from(files).map((file: any) =>
        URL.createObjectURL(file));

      this.setState({
        photos: tempURLs,
      });

    } else if (files.length > 7) {
      alert(translations.carLabel.uploadLength);
      let tempURLs = Array.from(files).slice(0, 7);
      tempURLs = tempURLs.map((file: any) => URL.createObjectURL(file));
      this.setState({
        photos: tempURLs,
      });

    } else {
      this.setState({
        photos: [],
      });
    }
  }

  handleCreateCar = async (e: any, createCar: any) => {
    e.preventDefault();
    await createCar();
    console.log("hooray");
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

      //Feature exists and "id" must be overwritten
      if (featureIndex > -1) {
        if (value.value != (translations.general.none) && value.category != "false") {
          this.setState({
            features: [
              ...features.slice(0, featureIndex),
              value,
              ...features.slice(featureIndex + 1),
            ],
          })
        }
        else {
          this.setState({
            features: [
              ...features.slice(0, featureIndex),
              ...features.slice(featureIndex + 1),
            ],
          });
        }
      }
      //Feature does not exist and can be added to the state
      else if (value.value != translations.general.none) {
        this.setState({
          features: [...features, value],
        });
      }

    } else {
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
    console.log(data);
    return { data };
  };

  render() {
    const {
      translations: { carLabel, cars },
    } = this.props;
    let fetchedCheckboxFeatures: any;
    let fetchedDropdownFeatures: any;
    return (
      <Query query={GET_FEATURES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage />;
          fetchedCheckboxFeatures = data.carFeatureCategories
            .filter((category: any) => category.type === 'TRUE_FALSE');
          fetchedDropdownFeatures = data.carFeatureCategories
            .filter((category: any) => category.type === 'MULTIPLE_CHOICE');
          return (
            <Mutation
              mutation={CARADD_MUTATION}
              variables={this.getCreateCarPayload()}
            >
              {createCar => (
                <Form onSubmit={e => this.handleCreateCar(e, createCar)}>
                  <h1>{carLabel.title}</h1>
                  <h2>{carLabel.general}</h2>
                  <div className="general">
                    <Table>
                      <Manufacturers handleChange={this.handleChange} />
                      <Models manufacturer={this.state.manufacturerID} handleChange={this.handleChange} />
                      <Categories handleChange={this.handleChange} />
                      <DropdownFeatures features={fetchedDropdownFeatures} handleChange={this.handleChange} />
                      <label>{cars.year}
                        <input type="text" id="year" onChange={this.handleInputChange} />
                      </label>
                      <label>{cars.mileage}
                        <input type="text" id="mileage" onChange={this.handleInputChange} />
                      </label>
                    </Table>
                  </div>
                  <h2>{carLabel.addons}</h2>
                  <div className="addons">
                    <CheckboxFeatures features={fetchedCheckboxFeatures} handleChange={this.handleChange} />
                    <label>{cars.details}</label>
                    <textarea name="other" id="other" cols={60} rows={2} />
                  </div>
                  <h2>{carLabel.upload}</h2>
                  <label className="btn">
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
                  <button className="formSubmit" type='submit'>{carLabel.carAddSumbit}</button>
                </Form>
              )}
            </Mutation>);
        }}
      </Query>
    );
  }
}
export default multi(CarAdd);
