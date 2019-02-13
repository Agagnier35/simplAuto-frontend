import React from 'react';
import { multi } from '../../lib/MultiLang';
import Translations from '../../lib/MultiLang/locales/types';
import StyledCarSummary from './styles';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { Car } from '../../generated/graphql';

export interface CarSummaryProp {
  translations: Translations;
  car: Car;
}

const CarSummary = ({ translations, car }: CarSummaryProp) => {
  return (
    <Link href={{ pathname: '/car', query: { id: car.id } }}>
      <StyledCarSummary>
        <Card>
          {car.photos.length > 0 ? (
            <Card.Img variant="top" src={car.photos[0]} />
          ) : (
            /* TODO: Change Placeholder */
            <Card.Img
              variant="top"
              src="http://clipart-library.com/image_gallery/17559.jpg"
              alt="No car photos placeholder"
            />
          )}

          <Card.Body>
            <Card.Title>
              {translations.cars.model}: {car.model.name}
            </Card.Title>
            <Card.Subtitle>
              {translations.cars.manufacturer}: {car.manufacturer.name}
            </Card.Subtitle>
            <Card.Text>
              {translations.cars.category}:{' '}
              {translations.carCategory[car.category.name] || car.category.name}
            </Card.Text>
            <Card.Text>
              {translations.cars.year}: {car.year}
            </Card.Text>
          </Card.Body>
        </Card>
      </StyledCarSummary>
    </Link>
  );
};

export default multi(CarSummary);
