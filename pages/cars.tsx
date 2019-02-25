import React from 'react';
import Cars from '../components/Car/Cars';
import PrivateComponent from '../lib/Auth/PrivateComponent';

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
