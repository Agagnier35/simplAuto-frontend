import React from 'react';
import Car from '../components/Car';
import PrivateComponent from '../lib/Auth/PrivateComponent';

class CarPage extends PrivateComponent {
  render() {
    return (
      <div>
        <Car {...this.props} />
      </div>
    );
  }
}

export default CarPage;
