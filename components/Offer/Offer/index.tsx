import React, { useEffect, useState } from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Button, Row, Col } from 'react-bootstrap';
import { OFFER_BY_ID } from './Queries';
import CarDetails from '../../Car/CarDetails';
import Chat from '../../Chat/Chat';
import {
  CREATE_CONVERSATION_MUTATION,
  DELETE_NOTIFICATION_MUTATION,
  ACCEPT_OFFER_MUTATION,
} from './Mutations';
import { Offer } from '../../../generated/graphql';
import { Price, PriceMileageWrapper, OfferButtons } from './styles';
import { IoIosTimer as KilometerIcon } from 'react-icons/io';
import {
  FaPrint as PrintIcon,
  FaEnvelope as MessageIcon,
  FaTimesCircle as RejectIcon,
  FaCheck as AcceptIcon,
} from 'react-icons/fa';
import AdSummaryItem from '../../Ad/AdSummary/AdSummaryItem';
import { LOGGED_IN_QUERY } from '../../General/Header';
import ConfirmationModal from '../../Confirmation/ConfirmationModal';

export interface OfferPageProps {
  translations: Translations;
  query: any;
}

const MyOffer = ({ translations, query }: OfferPageProps) => {
  const { data, error, loading } = useQuery(OFFER_BY_ID, {
    variables: { id: query.id },
  });

  const offer = data.offer as Offer;

  const [showModal, setshowModal] = useState(false);

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

  const handleAcceptOffer = useMutation(ACCEPT_OFFER_MUTATION, {
    variables: {
      id: offer.id,
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

  async function handleConfirmation() {
    //all confirmation logic is going here
    //should send emails here to buyer and seller
    handleAcceptOffer();
    setshowModal(false);
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
          {offer &&
            offer.addons &&
            offer.addons.map((addon: any) => (
              <ul>
                <li>{addon.name}</li>
              </ul>
            ))}
        </Col>
        <Col md={12} lg={4}>
          <div className="noPrint">
            <OfferButtons>
              {!offer.conversation && (
                <Button
                  onClick={() => handleCreateConversation()}
                  variant="primary"
                >
                  <MessageIcon />
                  {translations.offers.chat}
                </Button>
              )}
              <Button variant="warning">
                <RejectIcon />
                {translations.offers.reject}
              </Button>
              <Button variant="primary" onClick={() => setshowModal(true)}>
                <AcceptIcon />
                {translations.general.accept}
              </Button>
              <Button variant="primary" onClick={handlePrint}>
                <PrintIcon />
                {translations.general.print}
              </Button>
            </OfferButtons>
            {offer.conversation && <Chat offer={offer} />}
          </div>

          <ConfirmationModal
            show={showModal}
            onClose={() => setshowModal(false)}
            onConfirm={handleConfirmation}
          />
        </Col>
      </Row>
    </div>
  );
};

export default multi(MyOffer);
