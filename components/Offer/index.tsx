import React from 'react';
import { multi } from '../../lib/MultiLang';
import Translations from '../../lib/MultiLang/locales/types';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useQuery } from 'react-apollo-hooks';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { OFFER_BY_ID } from './Queries';
import CarDetails from '../CarDetails';

export interface OfferPageProps {
  translations: Translations;
  query: any;
}

const MyOffer = ({ translations, query }: OfferPageProps) => {
  const { data, error, loading } = useQuery(OFFER_BY_ID, {
    variables: { id: query.id },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>{translations.offers.title}</h1>
      <p>
        {translations.offers.price}: {data.offer.price}
      </p>
      {console.log(data.offer.addons)}
      {data.offer.addons.map((addon: any) => (
        <ul>
          <li>{addon.name}</li>
        </ul>
      ))}
      <CarDetails car={data.offer.car} />
      <ButtonToolbar>
        <Button variant="primary">{translations.offers.chat}</Button>
        <Button variant="primary">{translations.offers.reject}</Button>
      </ButtonToolbar>
    </div>
  );
};

export default multi(MyOffer);
