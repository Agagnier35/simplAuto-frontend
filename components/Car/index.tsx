import React, { useState } from 'react';
import { multi } from '../../lib/MultiLang';
import Translations from '../../lib/MultiLang/locales/types';
import Loading from '../../components/Loading';
import CarDetails from '../../components/CarDetails';
import ErrorMessage from '../../components/ErrorMessage';
import { useQuery } from 'react-apollo-hooks';
import { CAR_BY_ID, MATCHING_ADS_QUERY } from './Queries';
import { Card, CardDeck, Button } from 'react-bootstrap';
import { Ad, Offer } from '../../generated/graphql';
import AdSummary from '../AdSummary';
import OfferModal from '../OfferModal';

export interface CarPageProps {
  translations: Translations;
  query: {
    id: String;
  };
}

const Car = ({ translations, query }: CarPageProps) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedAd, setSelectedAd] = useState({});
  const [selectedOffer, setSelectedOffer] = useState({});
  const [isEditMode, setEditMode] = useState(false);

  const carQuery = useQuery(CAR_BY_ID, {
    variables: { id: query.id },
  });
  const adsQuery = useQuery(MATCHING_ADS_QUERY);
  const errors = carQuery.error || adsQuery.error;

  if (carQuery.loading) return <Loading />;
  if (errors) return <ErrorMessage error={errors} />;

  function handleToggleCreateOffer(ad: Ad) {
    setSelectedAd(ad);
    setModalOpened(true);
  }

  function handleToggleEditOffer(ad: Ad) {
    setSelectedAd(ad);
    setSelectedOffer(findMyOffer(ad));
    setEditMode(true);
    setModalOpened(true);
  }

  function toggleModal(_?: any) {
    if (modalOpened) {
      setModalOpened(false);
      setEditMode(false);
    } else {
      setModalOpened(true);
    }
  }

  function findMyOffer(ad: Ad) {
    const myOffers = carQuery.data.car.offers;
    if (myOffers) {
      return myOffers.find((offer: Offer) => offer.ad.id === ad.id);
    }
    return false;
  }

  return (
    <>
      <CardDeck>
        <Card>
          <div>
            <h2>{translations.cars.details}</h2>
            <CarDetails car={carQuery.data.car} />
          </div>
        </Card>
        <Card>
          <Card.Body>
            {adsQuery.data.ads &&
              adsQuery.data.ads.map((ad: Ad) => (
                <div key={ad.id}>
                  {findMyOffer(ad) ? (
                    <Button
                      onClick={() => {
                        handleToggleEditOffer(ad);
                      }}
                      variant="primary"
                    >
                      {translations.offers.modifyOffer}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handleToggleCreateOffer(ad);
                      }}
                      variant="primary"
                    >
                      {translations.offers.createOffer}
                    </Button>
                  )}
                  <AdSummary key={ad.id} ad={ad} />
                </div>
              ))}
          </Card.Body>
        </Card>
      </CardDeck>
      {modalOpened && (
        <OfferModal
          modalOpened={modalOpened}
          toggleModal={toggleModal}
          isEditMode={isEditMode}
          ad={selectedAd}
          car={carQuery.data.car}
          offer={selectedOffer}
        />
      )}
    </>
  );
};

export default multi(Car);
