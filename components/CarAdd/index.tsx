import React, { Component } from 'react';
import Form from './Form';
import { multi, MultiProps } from '../../lib/MultiLang';
import Carousel from './Carousel';
import Makes from './carMakes';
import Manufacturers from './carManufacturers';
import Models from './carModels';
import DropdownFeatures from './DropdownFeatures';
import CheckboxFeatures from './CheckboxFeatures';
import { Mutation } from 'react-apollo';
import { CarCreateInput } from '../../generated/graphql';
import gql from 'graphql-tag';
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
  }

  handlePictureChange(event: any) {
    const { translations } = this.props;
    if (event.target.files.length <= 7 && event.target.files.length > 0) {
      const tempURLs = Array.from(event.target.files).map((file: any) =>
        URL.createObjectURL(file),
      );

      this.setState({
        photos: tempURLs,
      });

    } else if (event.target.files.length > 7) {
      alert(translations.carLabel.uploadLength);
      let tempURLs = Array.from(event.target.files).slice(0, 7);
      tempURLs = tempURLs.map((file: any) => URL.createObjectURL(file));
      this.setState({
        photos: tempURLs,
      });

    } else {
      this.setState({
        photos: null,
      });
    }
  }

  handleCreateCar = async (e: any, createCar: any) => {
    e.preventDefault();
    console.log(createCar);
    await createCar();
  };

  handleChange = (key: string, value: any) => {
    if (key === 'features') {
      const featureIndex = this.state.features.findIndex(
        feature => feature.category === value.category,
      );
      //Feature exists and "id" must be overwritten
      if (featureIndex > -1) {
        this.setState({
          features: [
            ...this.state.features.slice(0, featureIndex),
            value,
            ...this.state.features.slice(featureIndex + 1),
          ],
        });
      }
      //Feature does not exist and can be added to the state
      else {
        this.setState({
          features: [...this.state.features, value],
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
    return { data };
  };

  render() {
    const {
      translations: { carLabel, cars },
    } = this.props;
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
              <table>
                <Manufacturers handleChange={this.handleChange} />
                <Models manufacturer={this.state.manufacturerID} handleChange={this.handleChange} />
                <Makes handleChange={this.handleChange} />
                <DropdownFeatures handleChange={this.handleChange} />
                <label>{cars.year}
                <input
                type="text"
                id="year"
                />
                </label>
                <label>{cars.mileage}
                 <input
                type="text"
                id="mileage"
                />
                </label>
              </table>
            </div>
            <h2>{carLabel.addons}</h2>
            <div className="addons">
              <fieldset>
              <CheckboxFeatures handleChange={this.handleChange} />
              </fieldset>
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
      </Mutation>
    );
  }
}
export default multi(CarAdd);