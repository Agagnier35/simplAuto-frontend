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
import { AdCreateInput, AdCarFeatureInput, ManufacturerFeatureInput, AdFeatureImportance,
ModelFeatureInput, CategoryFeatureInput, PriceBoundFeatureInput, YearBoundFeatureInput, 
MileageBoundFeatureInput } from '../../generated/graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;

interface AnnounceAddState {
  features: Maybe<AdCarFeatureInput[]>;
  manufacturerID: string;
  manufacturerImportance: Maybe<AdFeatureImportance>;

  modelFeatureID: string;
  modelImportance: Maybe<AdFeatureImportance>;

  categoryID: string;
  categoryImportance: Maybe<AdFeatureImportance>;

  priceLowerBound: number;
  priceLowerBoundImportance: Maybe<AdFeatureImportance>;
  priceHigherBound: number;
  priceHigherBoundImportance: Maybe<AdFeatureImportance>

  yearLowerBound: number;
  yearLowerBoundImportance: Maybe<AdFeatureImportance>;
  yearHigherBound: number;
  yearHigherBoundImportance: Maybe<AdFeatureImportance>;

  mileageLowerBound: number;
  mileageLowerBoundImportance: Maybe<AdFeatureImportance>;
  mileageHigherBound: number;
  mileageHigherBoundImportance: Maybe<AdFeatureImportance>;

  [key: string]: any;
}

const ANNOUNCEADD_MUTATION = gql`
  mutation ANNOUCEADD_MUTATION($data: AdCreateInput!) {
    createAd(data: $data) {
      id
    }
  }
`;

class AnnounceAdd extends Component<MultiProps, AnnounceAddState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
        features: null,
        manufacturerID: '',
        manufacturerImportance: null,
      
        modelFeatureID: '',
        modelImportance: null,
      
        categoryID: '',
        categoryImportance: null,
      
        priceLowerBound: 0,
        priceLowerBoundImportance: null,
        priceHigherBound: 0,
        priceHigherBoundImportance: null,
      
        yearLowerBound: 0,
        yearLowerBoundImportance: null,
        yearHigherBound: 0,
        yearHigherBoundImportance: null,
      
        mileageLowerBound: 0,
        mileageLowerBoundImportance: null,
        mileageHigherBound: 0,
        mileageHigherBoundImportance: null,
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
    };

  getCreateAnnouncePayload = () => {
    const PriceLower:  PriceBoundFeatureInput = {
        price: this.state.priceLowerBound,
        importance: this.state.priceLowerBoundImportance
    }
    const PriceHigher:  PriceBoundFeatureInput = {
        price: this.state.priceHigherBound,
        importance: this.state.priceHigherBoundImportance
    }
    const Manufacturer: ManufacturerFeatureInput = {
        manufacturerID: this.state.manufacturerID,
        importance: this.state.manufacturerImportance
    }
    const Model: ModelFeatureInput = {
        modelID: this.state.modelFeatureID,
        importance: this.state.modelImportance
    }
    const Category: CategoryFeatureInput = {
        categoryID: this.state.categoryID,
        importance: this.state.categoryImportance
    }
    const MileageLower: MileageBoundFeatureInput = {
        mileage: this.state.mileageLowerBound,
        importance: this.state.mileageLowerBoundImportance 
    }
    const MileageHigher: MileageBoundFeatureInput = {
        mileage: this.state.mileageHigherBound,
        importance: this.state.mileageHigherBoundImportance
    }
    const YearLower: YearBoundFeatureInput = {
        year: this.state.yearLowerBound,
        importance: this.state.yearLowerBoundImportance
    }
    const YearHigher: YearBoundFeatureInput = {
        year: this.state.yearHigherBound,
        importance: this.state.yearHigherBoundImportance
    }


    const AdCreate: AdCreateInput = {
        priceLowerBoundFeature: PriceLower,
        priceHigherBoundFeature: PriceHigher,
        manufacturerFeature: Manufacturer,
        modelFeature: Model,
        categoryFeature: Category,
        mileageLowerBoundFeature: MileageLower,
        mileageHigherBoundFeature: MileageHigher,
        yearLowerBoundFeature: YearLower,
        yearHigherBoundFeature: YearHigher,
        features: this.state.features, 
    };
    return { AdCreate };
  };

  render() {
    const {
      translations: { carLabel, cars },
    } = this.props;
    return (
      <Mutation
        mutation={ANNOUNCEADD_MUTATION}
        variables={this.getCreateAnnouncePayload()}
      >
        {createAnnounce => (
          <Form onSubmit={e => this.handleCreateAnnounce(e, createAnnounce)}>
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
            <button className="formSubmit" type='submit'>{carLabel.carAddSumbit}</button>
          </Form>
        )}
      </Mutation>
    );
  }
}
export default multi(AnnounceAdd);