import React from 'react';
import CarAdd from '../components/Car/CarAdd';
import PrivateComponent from '../lib/Auth/PrivateComponent';

class CarAddPage extends PrivateComponent {
  render() {
    return (
      <div>
        <CarAdd />
      </div>
    );
  }
}

export default CarAddPage;
