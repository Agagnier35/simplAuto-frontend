import React from 'react';
import { multi } from '../../lib/MultiLang';
import Translations from '../../lib/MultiLang/locales/types';
import Loading from '../../components/Loading';
import CarDetails from '../../components/CarDetails';
import ErrorMessage from '../../components/ErrorMessage';
import { useQuery } from 'react-apollo-hooks';
import { CAR_BY_ID } from '../Car/Queries';

export interface OfferPageProps {
  translations: Translations;
  query: {
    id: String;
  };
}

const Offer = ({ translations, query }: OfferPageProps) => {
  const { data, error, loading } = useQuery(CAR_BY_ID, {
    variables: { id: query.id },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2>{translations.cars.details}</h2>
      <CarDetails car={data.car} />
    </div>
  );
};

export default multi(Offer);
