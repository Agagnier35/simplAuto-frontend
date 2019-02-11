import React, { Component } from 'react';
import Form from './Form';
import { multi, MultiProps } from '../../lib/MultiLang';
import Carousel from './Carousel';
import Makes from './carMakes';
import Manufacturers from './carManufacturers';
import Models from './carModels';
import Features from './carFeature';

interface CarAddState {
  files: any | null
}

class CarAdd extends Component<MultiProps, CarAddState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      files: null,
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
        files:  tempURLs
      })
    }
    else if (event.target.files.length > 7){
      alert(translations.carLabel.uploadLength);
      let tempURLs = (Array.from(event.target.files)).slice(0,7);     
      tempURLs = tempURLs.map((file: any) => (
      URL.createObjectURL(file)
      ))
      this.setState({
        files: tempURLs
      })
    }
    else {
      this.setState({
        files: null
      })
    }
  }

render() {
  const {
    translations: { carLabel },
  } = this.props;
    return (
    <Form>
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
            <Features />
        </fieldset>
        <label>{carLabel.description}</label> 
        <textarea name="other" id="other" cols={60} rows={2}></textarea>
      </div>  
      <h2>{carLabel.upload}</h2>
      <label className="btn">{carLabel.uploadBtn}
      <input id="files" type="file" accept="x-png,image/jpeg" multiple onChange={this.handlePictureChange} />
      </label>
    <div className="carousel">
      <Carousel items={this.state.files}/>
      </div>
    </Form>
  )}
}
export default multi(CarAdd);