import React, { FormEvent, Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../lib/MultiLang';
import { AdCreateInput } from '../../generated/graphql';
import IsLoggedIn from '../IsLoggedIn';

const UPDATE_AD_MUTATION = gql`
  mutation UPDATE_AD_MUTATION($data: AdUpdateInput!) {
    updateAd(data: $data) {
      id
    }
  }
`;

// 1. Get la ad à partir du ID du query string
// 2. Handle les changements de la ad
// 3. Lorsque la personne submit, call la mutation

type KeyValue = { [key: string]: any };
type Dictionnary<T> = T & KeyValue;

class UpdateLogin extends Component<MultiProps, Dictionnary<AdCreateInput>> {
  state: AdCreateInput = {
    features: null,
    manufacturerFeature: null,
    modelFeature: null,
    categoryFeature: null,
    yearLowerBoundFeature: null,
    yearHigherBoundFeature: null,
    mileageLowerBoundFeature: null,
    mileageHigherBoundFeature: null,
    priceLowerBoundFeature: null,
    priceHigherBoundFeature: null,
  };

  // Recevoir l'offre, puis mettre les infos dans le state.

  handleUpdateAd = async (e: any, updateAd: any) => {
    e.preventDefault();
    await updateAd();
  };

  handleFeaturesChange = (value: any) => {
    const { translations } = this.props;
    const features = this.state.features || [];
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
  };

  handleChange = (key: string, value: any, accessor?: string) => {
    if (key === 'features') {
      this.handleFeaturesChange(value);
    } else {
      // Not a feature
      if (accessor) {
        this.setState(prevState => ({
          [key]: { ...prevState[key], [accessor]: value.value },
        }));
      }
    }
  };

  render() {
    return (
      <IsLoggedIn>
        <div>UPDATING DE LA AD</div>
      </IsLoggedIn>
    );
  }
}

export default multi(UpdateLogin);
