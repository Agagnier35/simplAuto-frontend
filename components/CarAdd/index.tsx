import React, { Component } from 'react';
import Form from './Form';
import { multi, MultiProps } from '../../lib/MultiLang';
import Carousel from './Carousel';
import Makes from './carMakes';
import Manufacturers from './carManufacturers';
import Models from './carModels';
import Features from './DropdownFeatures';
import { Mutation } from 'react-apollo';
import { CarCreateInput } from '../../generated/graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;

interface CarAddState {
  features: any[]
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
      photos: null,
      features: [],
      manufacturerID: "",

  modelID:  "",

  categoryID:  "",

  year: 0,

  mileage: 0,


  featuresIDs: null
    }

    this.handlePictureChange = this.handlePictureChange.bind(this)
  }

  handlePictureChange(event: any) {
    const { translations } = this.props;
    if (event.target.files.length <= 7 && event.target.files.length > 0) {

      const tempURLs = (Array.from(event.target.files)).map((file: any) => (
        URL.createObjectURL(file)
      ))

      this.setState({
        photos: tempURLs
      })
    }
    else if (event.target.files.length > 7) {
      alert(translations.carLabel.uploadLength);
      let tempURLs = (Array.from(event.target.files)).slice(0, 7);
      tempURLs = tempURLs.map((file: any) => (
        URL.createObjectURL(file)
      ))
      this.setState({
        photos: tempURLs
      })
    }
    else {
      this.setState({
        photos: null
      })
    }
  }

  handleCreateCar = async (e: any, createCar: any) => {
    e.preventDefault();
    console.log(createCar)
    await createCar();
    console.log("hooray !");
  }

  handleChange = (key: string, value: any) => {
    if (key === 'features') {
      const featureIndex = this.state.features.findIndex(feature => feature.category === value.category);
      //Feature does not exist and can be added to the state
      if (featureIndex > -1) {
        this.setState({
          features: [
            ...this.state.features,
            value
          ]
        })
      }
      //Feature exists and "id" must be overwritten
      else {
        this.setState({
          features: [
            ...this.state.features.slice(0, featureIndex),
            value,
            ...this.state.features.slice(featureIndex + 1)
          ]
        })
      }
    } 
    else {
      this.setState({ [key]: value });
    }
  }

  getCreateCarPayload = () => {
    const data: CarCreateInput = {
      manufacturerID: this.state.manufacturerID,

      modelID: this.state.modelID,

      categoryID: this.state.categoryID,

      year: this.state.year,

      mileage: this.state.mileage,
      
      photos: [],

      featuresIDs: this.state.features,
    }
     console.log(typeof(data.manufacturerID));
    return { data };
  }

  render() {
    const {
      translations: { carLabel, cars },
    } = this.props;
    return (
      <Mutation mutation={CARADD_MUTATION} variables={this.getCreateCarPayload()}>
        {(createCar) => (
          <Form onSubmit={(e) => this.handleCreateCar(e, createCar)}>
            <h1>{carLabel.title}</h1>
            <h2>{carLabel.general}</h2>
            <div className="general">
              <table>
                <Manufacturers handleChange={this.handleChange}/>
                <Models handleChange={this.handleChange}/>
                <Makes handleChange={this.handleChange}/>
                <Features handleChange={this.handleChange}/>
              </table>
            </div>
            <h2>{carLabel.addons}</h2>
            <div className="addons">
              <fieldset>
                <Features handleChange={this.handleChange} />
              </fieldset>
              <label>{cars.details}</label>
              <textarea name="other" id="other" cols={60} rows={2}></textarea>
            </div>
            <h2>{carLabel.upload}</h2>
            <label className="btn">{carLabel.uploadBtn}
              <input id="photos" type="file" accept="x-png,image/jpeg" multiple onChange={this.handlePictureChange} />
            </label>
            <div className="carousel">
              <Carousel items={this.state.photos} />
            </div>
            <button className="formSubmit" type='submit'>{carLabel.carAddSumbit}</button>
          </Form>
        )}

      </Mutation>

    )
  }
}
export default multi(CarAdd);