import React from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { OFFER_BY_ID } from './Queries';
import CarDetails from '../../Car/CarDetails';
import Chat from '../../Chat/Chat';
import { CREATE_CONVERSATION_MUTATION } from './Mutations';

export interface OfferPageProps {
  translations: Translations;
  query: any;
}

const MyOffer = ({ translations, query }: OfferPageProps) => {
  const { data, error, loading } = useQuery(OFFER_BY_ID, {
    variables: { id: query.id },
  });

  const handleCreateConversation = useMutation(CREATE_CONVERSATION_MUTATION, {
    variables: {
      offerID: data.offer && data.offer.id,
    },
  });

  function handlePrint() {
    window.print();
  }

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>{translations.offers.title}</h1>
      <p>
        {translations.offers.price}: {data.offer.price}
      </p>
      {data.offer.addons.map((addon: any) => (
        <ul>
          <li>{addon.name}</li>
        </ul>
      ))}
      <CarDetails car={data.offer.car} />
      <div className="noPrint">
        <ButtonToolbar>
          <Button onClick={() => handleCreateConversation()} variant="primary">
            {translations.offers.chat}
          </Button>
          <Button variant="primary">{translations.offers.reject}</Button>
          <Button variant="primary" onClick={handlePrint}>
            {translations.general.print}
          </Button>
        </ButtonToolbar>
        {data.offer.conversation && <Chat offer={data.offer} />}
      </div>
    </div>
  );
};

export default multi(MyOffer);
