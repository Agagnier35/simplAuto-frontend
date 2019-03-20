import React, { useEffect } from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { OFFER_BY_ID } from './Queries';
import CarDetails from '../../Car/CarDetails';
import Chat from '../../Chat/Chat';
import {
  CREATE_CONVERSATION_MUTATION,
  DELETE_NOTIFICATION_MUTATION,
} from './Mutations';
import { Offer } from '../../../generated/graphql';
import {
  Price,
  PriceMileageWrapper,
  OfferButtons,
  CreateConversation,
} from './styles';
import { IoIosTimer as KilometerIcon } from 'react-icons/io';
import {
  FaPrint as PrintIcon,
  FaEnvelope as MessageIcon,
  FaTimesCircle as RejectIcon,
} from 'react-icons/fa';
import AdSummaryItem from '../../Ad/AdSummary/AdSummaryItem';
import { LOGGED_IN_QUERY } from '../../General/Header';
import OfferAddons from '../OfferAddons';
import OfferCreator from '../OfferCreator';

export interface OfferPageProps {
  translations: Translations;
  query: any;
}

const MyOffer = ({ translations, query }: OfferPageProps) => {
  const { data, error, loading } = useQuery(OFFER_BY_ID, {
    variables: { id: query.id },
  });

  const offer = data.offer as Offer;

  const handleCreateConversation = useMutation(CREATE_CONVERSATION_MUTATION, {
    variables: {
      offerID: offer && offer.id,
    },
  });

  const handleDeleteNotification = useMutation(DELETE_NOTIFICATION_MUTATION, {
    variables: {
      id: offer && offer.id,
    },
    refetchQueries: [{ query: LOGGED_IN_QUERY }],
  });

  useEffect(() => {
    if (offer) {
      handleDeleteNotification();
    }
  }, [offer]);

  function handlePrint() {
    window.print();
  }

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        {offer.car.manufacturer.name} {offer.car.model.name} {offer.car.year}
      </h1>
      <PriceMileageWrapper>
        <Price>{offer.price} $</Price>
        <AdSummaryItem
          icon={<KilometerIcon />}
          label={translations.cars.mileage}
          value={offer.car.mileage}
        />
      </PriceMileageWrapper>
      <Row>
        <Col md={12} lg={8}>
          <CarDetails car={offer.car} />
          <Card style={{ marginBottom: '1rem' }}>
            <Card.Body>
              <h5>Description</h5>
              {offer.car.description}
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={4}>
          <div className="noPrint">
            <OfferCreator
              offer={offer}
              button={
                !offer.conversation && (
                  <CreateConversation
                    onClick={() => handleCreateConversation()}
                    variant="primary"
                  >
                    <MessageIcon />
                    {translations.offers.chat}
                  </CreateConversation>
                )
              }
            />
            <OfferButtons>
              <Button variant="warning">
                <RejectIcon />
                {translations.offers.reject}
              </Button>
              <Button variant="primary" onClick={handlePrint}>
                <PrintIcon />
                {translations.general.print}
              </Button>
            </OfferButtons>
            {offer.conversation && <Chat offer={offer} />}
            <OfferAddons offer={offer} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default multi(MyOffer);
