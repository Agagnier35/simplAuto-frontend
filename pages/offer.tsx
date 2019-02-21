import React from 'react';
import PrivateComponent from '../lib/Auth/PrivateComponent';
import Offer from '../components/Offer';

class OfferPage extends PrivateComponent {
  render() {
    return (
      <div>
        <Offer />
      </div>
    );
  }
}

export default OfferPage;
