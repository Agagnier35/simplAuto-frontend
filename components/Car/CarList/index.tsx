import React from 'react';
import StyledCarList from './styles';
import CarSummary from '../CarSummary/index';
import { CardDeck } from 'react-bootstrap';
import { Car } from '../../../generated/graphql';

export interface CarsProps {
  cars: Car[];
}

const CarList = ({ cars }: CarsProps) => {
  return (
    <StyledCarList>
      <CardDeck>
        {cars.map((car: Car) => (
          <CarSummary key={car.id} car={car} />
        ))}
      </CardDeck>
    </StyledCarList>
  );
};

export default CarList;
