import React, { useState } from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { useQuery } from 'react-apollo-hooks';
import { CAR_BY_ID, MATCHING_ADS_QUERY } from './Queries';
import { Card, Button, Breadcrumb } from 'react-bootstrap';
import { Ad, Offer } from '../../../generated/graphql';
import AdSummary from '../../Ad/AdSummary';
import OfferModal from '../../Offer/OfferModal';
import CarSummary from '../CarSummary';
import { AdSummaries, Tab, TabBadge } from '../../Ad/Ads/styles';
import { OfferPrice } from '../../Ad/AdSummary/styles';
import Paging from '../../General/Paging';
import Link from 'next/link';
import { paging10pages } from '../../General/Preferences';

export interface CarPageProps {
  translations: Translations;
  query: {
    id: String;
  };
}

const Car = ({ translations, query }: CarPageProps) => {
  const [pageIndexOffer, setPageIndexOffer] = useState(0);
  const [pageIndexAds, setPageIndexAds] = useState(0);

  const [modalOpened, setModalOpened] = useState(false);
  const [selectedAd, setSelectedAd] = useState({});
  const [selectedOffer, setSelectedOffer] = useState({});
  const [isEditMode, setEditMode] = useState(false);
  const [isOfferMode, setOfferMode] = useState(false);

  const carQuery = useQuery(CAR_BY_ID, {
    variables: {
      id: query.id,
      pageNumberOffer: pageIndexOffer,
      pageSizeOffer: paging10pages,
    },
  });
  const adsQuery = useQuery(MATCHING_ADS_QUERY, {
    variables: {
      id: query.id,
      pageNumberAds: pageIndexAds,
      pageSizeAds: paging10pages,
    },
  });
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

  return (
    <>
      <Breadcrumb>
        <Link href={{ pathname: '/cars' }} passHref>
          <Breadcrumb.Item>{translations.general.sell}</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item active>
          {carQuery.data.car.manufacturer.name} {carQuery.data.car.model.name}{' '}
          {carQuery.data.car.year}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{ overflow: 'hidden', marginBottom: '2rem' }}>
        <CarSummary car={carQuery.data.car} />
      </Card>
      <Tab
        onClick={() => setOfferMode(false)}
        className={isOfferMode ? '' : 'active'}
      >
        {translations.Ads.title}
        <TabBadge>
          {!adsQuery.loading &&
          adsQuery.data.adSuggestion &&
          adsQuery.data.adSuggestion[0]
            ? adsQuery.data.adSuggestion[0].totalLength
            : 0}
        </TabBadge>
      </Tab>
      <Tab
        onClick={() => setOfferMode(true)}
        className={isOfferMode ? 'active' : ''}
      >
        {translations.general.yourOffers}
        <TabBadge>{carQuery.data.car.offers.length}</TabBadge>
      </Tab>
      {!isOfferMode && (
        <div>
          <p>{translations.ad.AdSuggestion}</p>
          <Card style={{ overflow: 'hidden' }}>
            <AdSummaries
              hidden={
                adsQuery.loading ||
                !(adsQuery.data.adSuggestion && adsQuery.data.adSuggestion[0])
              }
            >
              {adsQuery.data.adSuggestion ? (
                adsQuery.data.adSuggestion.map((suggestion: any) => (
                  <div key={suggestion.ad.id}>
                    <AdSummary
                      key={suggestion.ad.id}
                      ad={suggestion.ad}
                      right={
                        <Button
                          onClick={() => {
                            handleToggleCreateOffer(suggestion.ad);
                          }}
                          variant="primary"
                        >
                          {translations.offers.createOffer}
                        </Button>
                      }
                    />
                  </div>
                ))
              ) : (
                <p>{translations.offers.noAdsInYourArea}</p>
              )}
              <Paging
                pageIndex={pageIndexAds}
                setPageIndex={setPageIndexAds}
                maxItems={
                  adsQuery.data.adSuggestion && adsQuery.data.adSuggestion[0]
                    ? adsQuery.data.adSuggestion[0].totalLength
                    : 0
                }
                itemsByPage={paging10pages}
              />
            </AdSummaries>
            <div
              hidden={
                adsQuery.loading ||
                (adsQuery.data.adSuggestion && adsQuery.data.adSuggestion[0])
              }
            >
              {translations.Ads.noMatchingAds}
            </div>
            <div hidden={!adsQuery.loading}>
              <Loading />
            </div>
          </Card>
        </div>
      )}
      {isOfferMode && (
        <Card style={{ overflow: 'hidden' }}>
          <AdSummaries hidden={carQuery.data.car.offerCount === 0}>
            {carQuery.data.car.offers.map((offer: Offer) => (
              <div key={offer.ad.id}>
                <AdSummary
                  key={offer.ad.id}
                  ad={offer.ad}
                  offer={offer}
                  right={
                    <>
                      <Button
                        onClick={() => {
                          handleToggleEditOffer(offer.ad);
                        }}
                        variant="primary"
                      >
                        {translations.offers.modifyOffer}
                      </Button>
                      <OfferPrice style={{ marginTop: '1rem' }}>
                        {offer.price} $
                      </OfferPrice>
                    </>
                  }
                />
              </div>
            ))}
            <Paging
              pageIndex={pageIndexOffer}
              setPageIndex={setPageIndexOffer}
              maxItems={carQuery.data.car.offerCount}
              itemsByPage={paging10pages}
            />
          </AdSummaries>
        </Card>
      )}

      {modalOpened && (
        <OfferModal
          query={{
            query: MATCHING_ADS_QUERY,
            variables: {
              id: query.id,
              pageNumberAds: pageIndexAds,
              pageSizeAds: paging10pages,
            },
          }}
          modalOpened={modalOpened}
          toggleModal={toggleModal}
          isEditMode={isEditMode}
          ad={selectedAd}
          car={carQuery.data.car}
          pageIndexAd={pageIndexAds}
          pageIndexOffer={pageIndexOffer}
          offer={selectedOffer}
        />
      )}
    </>
  );
};

export default multi(Car);
