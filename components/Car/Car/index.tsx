import React, { useState } from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import Loading from '../../General/Loading';
import CarDetails from '../../Car/CarDetails';
import ErrorMessage from '../../General/ErrorMessage';
import { useQuery } from 'react-apollo-hooks';
import { CAR_BY_ID, MATCHING_ADS_QUERY } from './Queries';
import { Card, CardDeck, Button } from 'react-bootstrap';
import { Ad, Offer } from '../../../generated/graphql';
import AdSummary from '../../Ad/AdSummary';
import OfferModal from '../../Offer/OfferModal';
import CarSummary from '../CarSummary';
import { AdSummaries, Tab, TabBadge } from '../../Ad/Ads/styles';

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

  function handlePrint() {
    window.print();
  }

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
      setSelectedAd({});
      setSelectedOffer({});
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
      <Card style={{ overflow: 'hidden', marginBottom: '2rem' }}>
        <CarSummary car={carQuery.data.car} />
      </Card>
      <Tab>
        Annonces correspondantes
        {adsQuery.data.ads && <TabBadge>{adsQuery.data.ads.length}</TabBadge>}
      </Tab>
      <Card style={{ overflow: 'hidden' }}>
        <AdSummaries>
          {adsQuery.data.ads &&
            adsQuery.data.ads.map((ad: Ad) => (
              <div key={ad.id}>
                <AdSummary
                  key={ad.id}
                  ad={ad}
                  right={
                    findMyOffer(ad) ? (
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
                    )
                  }
                />
              </div>
            ))}
        </AdSummaries>
      </Card>

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
