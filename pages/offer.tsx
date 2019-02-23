import React from 'react';
import PrivateComponent from '../lib/Auth/PrivateComponent';
import MyOffer from '../components/Offer';

class OfferPage extends PrivateComponent {
  render() {
    return (
      <div>
        <MyOffer query={this.props.query} />
      </div>
    );
  }
}

export default OfferPage;
