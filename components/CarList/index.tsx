import React from 'react';
import StyledCarList from './styles';
import CarSummary from '../CarSummary/index';
import { CardDeck } from 'react-bootstrap';

export interface CarsProps {
  cars: any[];
}

const CarList = ({ cars }: CarsProps) => {
  return (
    <StyledCarList>
      <CardDeck>
        {cars.map((car: any) => (
          <CarSummary key={car.id} car={car} />
        ))}
      </CardDeck>
    </StyledCarList>
  );
};

export default CarList;
