import React from 'react';
import { multi } from '../../lib/MultiLang';
import Translations from '../../lib/MultiLang/locales/types';
import Loading from '../../components/Loading';
import CarDetails from '../../components/CarDetails';
import ErrorMessage from '../../components/ErrorMessage';
import { useQuery } from 'react-apollo-hooks';
import { CAR_BY_ID } from './Queries';
import { Button } from 'react-bootstrap';

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

  function handlePrint() {
    window.print();
  }

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2>{translations.cars.details}</h2>
      <CarDetails car={data.car} />
      <Button className="noPrint" variant="light" onClick={() => handlePrint()}>
        {translations.general.print}
      </Button>
    </div>
  );
};

export default multi(Car);
