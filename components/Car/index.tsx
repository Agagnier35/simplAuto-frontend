import React from 'react';
import { multi } from '../../lib/MultiLang';
import Translations from '../../lib/MultiLang/locales/types';
import Loading from '../../components/Loading';
import CarDetails from '../../components/CarDetails';
import ErrorMessage from '../../components/ErrorMessage';
import { useQuery } from 'react-apollo-hooks';
import { CAR_BY_ID } from './Queries';
import { Card, CardDeck } from 'react-bootstrap';
import Ads from '../Ads';

export interface CarPageProps {
  translations: Translations;
  query: {
    id: String;
  };
}

const Car = ({ translations, query }: CarPageProps) => {
  const { data, error, loading } = useQuery(CAR_BY_ID, {
    variables: { id: query.id },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <CardDeck>
      <Card>
        <div>
          <h2>{translations.cars.details}</h2>
          <CarDetails car={data.car} />
        </div>
      </Card>
      <Card>
        <Card.Body>
          <Ads />
        </Card.Body>
      </Card>
    </CardDeck>
  );
};

export default multi(Car);
