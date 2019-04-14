import React from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import { Top10Car } from '../../../generated/graphql';
import { multi } from '../../../lib/MultiLang';
import { Container, MakeModel, Top10Stats, Stat } from './style';

interface Top10CarSummaryProps {
  translations: Translations;
  car: Top10Car;
}

const Top10CarSummary = ({ translations, car }: Top10CarSummaryProps) => {
  const { admin } = translations;
  return (
    <Container>
      <MakeModel>
        {car.make.name} {car.model.name}
      </MakeModel>
      <Top10Stats>
        <Stat>
          {admin.vehiculesCount}: {car.count}
        </Stat>
        <Stat>
          {admin.averagePrice}:{' '}
          {car.averagePrice ? car.averagePrice.toFixed(2) : 0}
        </Stat>
        <Stat>
          {admin.averageDom}: {car.averageTime ? car.averageTime.toFixed(2) : 0}
        </Stat>
      </Top10Stats>
    </Container>
  );
};

export default multi(Top10CarSummary);
