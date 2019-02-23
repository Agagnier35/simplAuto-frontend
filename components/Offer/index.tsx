import React from 'react';
import { multi } from '../../lib/MultiLang';
import Translations from '../../lib/MultiLang/locales/types';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useQuery } from 'react-apollo-hooks';
import { CAR_BY_ID } from '../Car/Queries';
import Car from '../Car';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Offer } from '../../generated/graphql';

export interface OfferPageProps {
  translations: Translations;
  query: Offer;
}

const MyOffer = ({ translations, query }: OfferPageProps) => {
  const { error, loading } = useQuery(CAR_BY_ID, {
    variables: { id: query.id },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>{translations.offers.title}</h1>
      <p>
        {translations.offers.price}: {query.price}
      </p>
      <Car query={query.car} />
      <ButtonToolbar>
        <Button variant="primary">{translations.offers.chat}</Button>
        <Button variant="primary">{translations.offers.reject}</Button>
      </ButtonToolbar>
    </div>
  );
};

export default multi(MyOffer);
