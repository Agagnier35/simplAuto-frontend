import React from 'react';
import { multi } from '../../lib/MultiLang';
import Translations from '../../lib/MultiLang/locales/types';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useQuery } from 'react-apollo-hooks';
import { CAR_BY_ID } from '../Car/Queries';
import Car from '../Car';
import { Button, ButtonToolbar } from 'react-bootstrap';

export interface OfferPageProps {
  translations: Translations;
  query: {
    id: String;
  };
}

const Offer = ({ translations, query }: OfferPageProps) => {
  const { error, loading } = useQuery(CAR_BY_ID, {
    variables: { id: query.id },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>{translations.offers.title}</h1>
      <Car query={query} />
      <ButtonToolbar>
        <Button variant="light">open chat</Button>
        <Button variant="light">reject offer</Button>
      </ButtonToolbar>
    </div>
  );
};

export default multi(Offer);
