import React from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import { Top10Car } from '../../../generated/graphql';
import { multi } from '../../../lib/MultiLang';
import { Container } from './style';

interface Top10CarSummaryProps {
  translations: Translations;
  car: Top10Car;
}

const Top10CarSummary = ({ translations, car }: Top10CarSummaryProps) => {
  const { admin } = translations;
  return (
    <Container>
      <h4>
        {car.make.name} {car.model.name}
      </h4>
      <br />
      <h6>
        {admin.vehiculesCount}: {car.count}
      </h6>
      <h6>
        {admin.averagePrice}: {car.averagePrice}
      </h6>
      <h6>
        {admin.averageDom}: {car.averageTime}
      </h6>
    </Container>
  );
};

export default multi(Top10CarSummary);
