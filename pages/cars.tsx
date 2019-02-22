import React from 'react';
import Cars from '../components/Cars';
import PrivateComponent from '../lib/Auth/PrivateComponent';
import AdSummary from '../components/AdSummary';

class CarsPage extends PrivateComponent {
  render() {
    return (
      <div>
        <Cars />
      </div>
    );
  }
}

export default CarsPage;
