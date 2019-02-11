import React, { Component } from 'react';
import Form from './Form';
import { multi, MultiProps } from '../../lib/MultiLang';
import Carousel from './Carousel';
import Makes from './carMakes';
import Manufacturers from './carManufacturers';
import Models from './carModels';
import Features from './carFeatures';

class CarAdd extends Component<MultiProps> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      files: null,
    }

    this.handlePictureChange = this.handlePictureChange.bind(this)
  }

  handlePictureChange(event: any) {
    if (event.target.files.length <= 7 && event.target.files.length > 0) {
      let tempURLs = []
      for (var i = 0; i < event.target.files.length; i++)
      {
        tempURLs[i] = URL.createObjectURL(event.target.files[i]);
      }
      this.setState({
        files:  tempURLs
      })
    }
    else if (event.target.files.length > 7){
      alert("Please upload 7 pictures maximum");
      let tempURLs = []
      for (var i = 0; i < 7; i++)
      {
        tempURLs[i] = URL.createObjectURL(event.target.files[i]);
      }
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
    translations: { carLabel, condition, transmission, fuel, general },
  } = this.props;
    return (
    <Form>
      <h1>{carLabel.title}</h1>
      <h2>{carLabel.general}</h2>
      <div className="general">
        <table>
            <tbody>
                <tr>
                    <td>{carLabel.condition}</td>
                    <td>         
                        <select>
                            <option disabled selected hidden>{general.defaultDropdown}</option>
                            <option value="new">{condition.brandNew}</option>
                            <option value="used">{condition.used}</option>
                            <option value="lease">{condition.lease}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>{carLabel.make}</td>
                    <td><Manufacturers /></td>
                </tr>
                <tr>
                    <td>{carLabel.model}</td>
                    <td><Models /></td>
                </tr>
                <tr>
                    <td>{carLabel.year}</td>
                    <td>                
                        <input
                        type="text"
                        name="year"
                        placeholder={carLabel.year}
                        />
                    </td>
                </tr>
            </tbody> 
        </table>
        <table>
          <tbody>
        <tr>
          <td>{carLabel.type}</td>
          <td>  
            <Makes />
          </td>
        </tr>
        <tr>
          <td>{carLabel.driveTrain}</td>
          <td>    
            <select>
              <option disabled selected hidden>{general.defaultDropdown}</option>
              <option value="manual">{transmission.manual}</option>
              <option value="automatic">{transmission.automatic}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>{carLabel.fuel}</td>
          <td>
            <select>
              <option disabled selected hidden>{general.defaultDropdown}</option>
              <option value="gas">{fuel.gas}</option>
              <option value="diesel">{fuel.diesel}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>{carLabel.kilometers}</td>

          <td>      
            <input
              type="text"
              name="kilometers"
              placeholder={carLabel.kilometers}
            />
            </td>
        </tr>
        </tbody>
      </table> 
      <table>
      <tbody>
        <tr>
          <td>{carLabel.transmission}</td>
          <td>  
            {/*Query for transmissions */}
          </td>
        </tr>
        <tr>
          <td>{carLabel.color}</td>
          <td>    
            {/*Query for colors */}
          </td>
        </tr>
        <tr>
          <td>{carLabel.doors}</td>
          <td>      
            <select>
              <option disabled selected hidden>{general.defaultDropdown}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="other">{general.other}</option>
            </select>
            </td>
        </tr>
        <tr>
          <td>{carLabel.seats}</td>

          <td>      
            <select>
              <option disabled selected hidden>{general.defaultDropdown}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="other">{general.other}</option>
            </select>
            </td>
        </tr>
        </tbody>
      </table> 
      </div>
      <h2>{carLabel.addons}</h2>
      <div className="addons">
        <fieldset>
            <Features />
        </fieldset>
        <label>{carLabel.description}</label> 
        <textarea name="other" id="other" cols="60" rows="2"></textarea>
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