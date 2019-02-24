import React from 'react';
import Car from '../components/Car';
import PrivateComponent from '../lib/Auth/PrivateComponent';

export interface CarPageProps {
  query: string;
}

class CarPage extends PrivateComponent<CarPageProps> {
  render() {
    return <Car {...this.props} />;
  }
}

export default CarPage;
