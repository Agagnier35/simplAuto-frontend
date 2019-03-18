import React from 'react';
import PrivateComponent from '../lib/Auth/PrivateComponent';
import Offer from '../components/Offer/Offer';
import Premium from '../components/Premium/Premium';

class PremiumPage extends PrivateComponent {
  render() {
    return (
      <div>
        <Premium {...this.props} />
      </div>
    );
  }
}

export default PremiumPage;
