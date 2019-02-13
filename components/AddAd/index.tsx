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
import { AdCreateInput, ManufacturerFeatureInput, AdFeatureImportance,
ModelFeatureInput, CategoryFeatureInput, PriceBoundFeatureInput, YearBoundFeatureInput, 
MileageBoundFeatureInput, Maybe} from '../../generated/graphql';
import gql from 'graphql-tag';

interface AddAdState {

  Ad: AdCreateInput;
}

const ANNOUNCEADD_MUTATION = gql`
  mutation ANNOUCEADD_MUTATION($data: AdCreateInput!) {
    createAd(data: $data) {
      id
    }
  }
`;

class AddAd extends Component<MultiProps, AddAdState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
        Ad: {
            priceLowerBoundFeature: {
              price: 0,

              importance: AdFeatureImportance.Low,
          },

            priceHigherBoundFeature: {
              price: 0,

              importance: AdFeatureImportance.Low,
          },

          manufacturerFeature: {
            manufacturerID: '',

            importance: AdFeatureImportance.Low,
          },

          modelFeature: {
            modelID: '',

            importance: AdFeatureImportance.Low,
          },

          categoryFeature: {
            categoryID: '',

            importance: AdFeatureImportance.Low,
          },

          mileageLowerBoundFeature: {
            mileage: 0,

            importance: AdFeatureImportance.Low,
          },

          mileageHigherBoundFeature: {
            mileage: 0,

            importance: AdFeatureImportance.Low,
          },

          yearLowerBoundFeature:{
            year: 0,

            importance: AdFeatureImportance.Low,
          },

          yearHigherBoundFeature: {
            year: 0,

            importance: AdFeatureImportance.Low,
          },

          features: []
        }  
    };
  }

  handleCreateAnnounce = async (e: any, createAnnounce: any) => {
    e.preventDefault();
    console.log(createAnnounce);
    await createAnnounce();
  };

  handleChange = (key: string, value: any) => {
    console.log(key)
    console.log(value)
    if (key === "features" || key === "featuresImportances"){
        
    } else{
      
    }
    };


  render() {
    const {
      translations: { carLabel, cars },
    } = this.props;
    return (
      <Mutation
        mutation={ANNOUNCEADD_MUTATION}
        variables={this.state.Ad}
      >
        {createAnnounce => (
          <Form onSubmit={e => this.handleCreateAnnounce(e, createAnnounce)}>
            <h1>{carLabel.title}</h1>
            <h2>{carLabel.general}</h2>
            <div className="general">
              <table>
                <tbody>
                  <Manufacturers handleChange={this.handleChange} />
                  <Models  handleChange={this.handleChange} />
                  <Makes handleChange={this.handleChange} />
                  <DropdownFeatures handleChange={this.handleChange} />
                  <tr> 
                    <td>
                    Lower Year
                    </td>
                    <td>
                      <input onChange={(e) => this.handleChange('LowerYear', e.currentTarget.value)}
                      type="text"
                      id="Loweryear"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td> 
                    Higher Year
                    </td>
                    <td>
                      <input onChange={(e) => this.handleChange('HigherYear', e.currentTarget.value)}
                      type="text"
                      id="Higheryear"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td> 
                    Lower mileage
                    </td>
                    <td>
                      <input onChange={(e) => this.handleChange('LowerMileage', e.currentTarget.value)}
                      type="text"
                      id="Lowermileage"
                      />
                    </td>
                  </tr>
                  <tr> 
                    <td>
                    Higher mileage
                    </td>
                    <td>
                      <input onChange={(e) => this.handleChange('HigherMileage', e.currentTarget.value)}
                      type="text"
                      id="Highermileage"
                      />
                    </td>
                  </tr>
                </tbody>
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
            <button className="formSubmit" type='submit'>{carLabel.carAddSumbit}</button>
          </Form>
        )}
      </Mutation>
    );
  }
}
export default multi(AddAd);