import React from 'react';
import StyledCarList from './styles';
import CarSummary from '../CarSummary/index';
import { Card } from 'react-bootstrap';
import { Car } from '../../../generated/graphql';

export interface CarsProps {
  cars: Car[];
}

const CarList = ({ cars }: CarsProps) => {
  return (
    <StyledCarList>
      <Card style={{ overflow: 'hidden' }}>
        {cars.map((car: any) => (
          <CarSummary key={car.id} car={car} />
        ))}
      </Card>
    </StyledCarList>
  );
};

export default CarList;
