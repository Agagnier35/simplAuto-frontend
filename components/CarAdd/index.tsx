import React, { Component } from 'react';
import Form from './Form';
import { multi, MultiProps } from '../../lib/MultiLang';
import Carousel from './Carousel';
import Makes from './carMakes';
import Manufacturers from './carManufacturers';
import Models from './carModels';
import Features from './carFeature';
import { Mutation } from 'react-apollo';
import { CarCreateInput } from '../../generated/graphql';

interface CarAddState {
  photos: any | null
  features: any[]
}

class CarAdd extends Component<MultiProps, CarAddState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      photos: null,
      features: []
    }

    this.handlePictureChange = this.handlePictureChange.bind(this)
  }

  handlePictureChange(event: any) {
    const { translations } = this.props;
    if (event.target.photos.length <= 7 && event.target.photos.length > 0) {

      const tempURLs = (Array.from(event.target.photos)).map((file: any) => (
        URL.createObjectURL(file)
      ))

      this.setState({
        photos: tempURLs
      })
    }
    else if (event.target.photos.length > 7) {
      alert(translations.carLabel.uploadLength);
      let tempURLs = (Array.from(event.target.photos)).slice(0, 7);
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
    await createCar();
  }

  handleChange = (key: string, value: any) => {
    if (key === 'features') {
      // checker si yer la
      const featureIndex = this.state.features.findIndex(feature => feature.category === value.category);
      if (featureIndex > -1) {
        // trouver l'item et le changer pour value
        this.setState({
          features: [
            ...this.state.features.slice(0, featureIndex),
            value,
            ...this.state.features.slice(featureIndex + 1)
          ]
        })
      }

      // si yer pas la
      this.setState({ features: [...this.state.features, value] } as any);

    } else {
      this.setState({ [key]: value } as any);
    }
  }

  getCreateCarPayload = () => {
    const data: CarCreateInput = {

    }

    return { data };
  }

  render() {
    const {
      translations: { carLabel },
    } = this.props;
    return (
      <Mutation mutation='' variables={this.getCreateCarPayload()}>
        {(createCar) => (
          <Form onSubmit={(e) => this.handleCreateCar(e, createCar)}>
            <h1>{carLabel.title}</h1>
            <h2>{carLabel.general}</h2>
            <div className="general">
              <table>
                <Features />
              </table>
            </div>
            <h2>{carLabel.addons}</h2>
            <div className="addons">
              <fieldset>
                <Features handleChange={this.handleChange} />
              </fieldset>
              <label>{carLabel.description}</label>
              <textarea name="other" id="other" cols={60} rows={2}></textarea>
            </div>
            <h2>{carLabel.upload}</h2>
            <label className="btn">{carLabel.uploadBtn}
              <input id="photos" type="file" accept="x-png,image/jpeg" multiple onChange={this.handlePictureChange} />
            </label>
            <div className="carousel">
              <Carousel items={this.state.photos} />
            </div>
            <button type='submit'></button>
          </Form>
        )}

      </Mutation>

    )
  }
}
export default multi(CarAdd);