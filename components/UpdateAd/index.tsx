import React, { FormEvent, Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../lib/MultiLang';
import { MdLockOutline } from 'react-icons/md';
import ErrorMessage from '../ErrorMessage/index';
// import { Card, Form, InputGroup, Button } from 'react-bootstrap';
// import Link from 'next/link';
import Router from 'next/router';
import { AdCreateInput } from '../../generated/graphql';

const UPDATE_AD_MUTATION = gql`
  mutation UPDATE_AD_MUTATION($data: AdUpdateInput!) {
    updateAd(data: $data) {
      id
    }
  }
`;

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

  render() {
    return <div>UPDATING DE LA AD</div>;
  }
}

export default multi(UpdateLogin);
