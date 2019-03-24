import React, { useState } from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { useQuery } from 'react-apollo-hooks';
import { CAR_BY_ID, MATCHING_ADS_QUERY } from './Queries';
import { Card, Button } from 'react-bootstrap';
import { Ad, Offer } from '../../../generated/graphql';
import AdSummary from '../../Ad/AdSummary';
import OfferModal from '../../Offer/OfferModal';
import CarSummary from '../CarSummary';
import { AdSummaries, Tab, TabBadge } from '../../Ad/Ads/styles';
import { OfferPrice } from '../../Ad/AdSummary/styles';

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
  const [isOfferMode, setOfferMode] = useState(false);

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

  const ads: Ad[] = [];
  const adsOffers: { ad: Ad; offer: Offer }[] = [];

  (function splitAds() {
    const allAds = adsQuery.data && (adsQuery.data.ads as Ad[]);
    if (allAds) {
      allAds.forEach((ad: Ad) => {
        const offer = findMyOffer(ad);
        if (offer) {
          adsOffers.push({ offer, ad });
        } else {
          ads.push(ad);
        }
      });
    }
  })(); // iife

  return (
    <>
      <Card style={{ overflow: 'hidden', marginBottom: '2rem' }}>
        <CarSummary car={carQuery.data.car} />
      </Card>
      <Tab
        onClick={() => setOfferMode(false)}
        className={isOfferMode ? '' : 'active'}
      >
        {translations.Ads.title}
        {ads && <TabBadge>{ads.length}</TabBadge>}
      </Tab>
      <Tab
        onClick={() => setOfferMode(true)}
        className={isOfferMode ? 'active' : ''}
      >
        {translations.general.offers}
        {adsOffers && <TabBadge>{adsOffers.length}</TabBadge>}
      </Tab>
      {!isOfferMode && (
        <Card style={{ overflow: 'hidden' }}>
          <AdSummaries>
            {ads.map((ad: Ad) => (
              <div key={ad.id}>
                <AdSummary
                  key={ad.id}
                  ad={ad}
                  right={
                    <Button
                      onClick={() => {
                        handleToggleCreateOffer(ad);
                      }}
                      variant="primary"
                    >
                      {translations.offers.createOffer}
                    </Button>
                  }
                />
              </div>
            ))}
          </AdSummaries>
        </Card>
      )}
      {isOfferMode && (
        <Card style={{ overflow: 'hidden' }}>
          <AdSummaries>
            {adsOffers.map((adOffer: { ad: Ad; offer: Offer }) => (
              <div key={adOffer.ad.id}>
                <AdSummary
                  key={adOffer.ad.id}
                  ad={adOffer.ad}
                  right={
                    <>
                      <Button
                        onClick={() => {
                          handleToggleEditOffer(adOffer.ad);
                        }}
                        variant="primary"
                      >
                        {translations.offers.modifyOffer}
                      </Button>
                      <OfferPrice style={{ marginTop: '1rem' }}>
                        {adOffer.offer.price} $
                      </OfferPrice>
                    </>
                  }
                />
              </div>
            ))}
          </AdSummaries>
        </Card>
      )}

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
