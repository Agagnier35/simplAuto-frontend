import React from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import { CarPortlet } from './styles';
import { Car, Offer } from '../../../generated/graphql';
import GeneralCarInfos from './GeneralCarInfos';
import CarFeatures from './CarFeatures';

export interface CarSummaryProp {
  translations: Translations;
  car: Car;
  offer?: Offer;
}

const CarSummary = ({
  translations,
  car,
  offer,
  ...otherProps
}: CarSummaryProp) => {
  const pages = offer
    ? [<GeneralCarInfos car={car} price={offer.price} />]
    : [<GeneralCarInfos car={car} />];

  if (car.features && car.features.length > 0) {
    pages.push(<CarFeatures car={car} />);
  }

  return (
    <CarPortlet
      {...otherProps}
      title={`${car.manufacturer.name} ${car.model.name} ${car.year}`}
      interval={3000}
      href={
        offer
          ? { pathname: '/offer', query: { id: offer.id } }
          : { pathname: '/car', query: { id: car.id } }
      }
      pages={pages}
      image={<img src={car.photos[0]} />}
    />
  );
};

export default multi(CarSummary);
