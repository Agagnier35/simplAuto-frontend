import React, { useState } from 'react';
import { Card, Breadcrumb, Button } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';
import { multi } from '../../../lib/MultiLang';
import { Offer, Ad } from '../../../generated/graphql';
import ErrorMessage from '../../General/ErrorMessage';
import Loading from '../../General/Loading';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { AD_DETAIL_QUERY } from './Queries';
import Router from 'next/router';
import GeneralModal, {
  MainAppObject,
  ModalAction,
} from '../../General/GeneralModal';
import gql from 'graphql-tag';
import { CarSummaries } from '../../Car/Car/styles';
import CarSummary from '../../Car/CarSummary';
import { Tab, TabBadge } from '../Ads/styles';
import AdSummary from '../AdSummary';
import Paging from '../../General/Paging';
import Link from 'next/link';
import { paging5pages } from '../../General/Preferences';
import MyAdOptions from '../MyAdOptions';
import { LOGGED_IN_QUERY } from '../../General/Header';

export interface AdDetailProps {
  translations: Translations;
  adID: string;
}

export const AD_DELETE_MUTATION = gql`
  mutation AD_DELETE_MUTATION($id: ID!) {
    deleteAd(id: $id) {
      id
    }
  }
`;

const AdDetail = ({ translations, adID }: AdDetailProps) => {
  const [pageIndex, setPageIndex] = useState(0);

  const [modalShow, setModalShow] = useState(false);

  const deleteAd = useMutation(AD_DELETE_MUTATION, {
    variables: { id: adID, pageNumber: pageIndex, pageSize: paging5pages },
  });

  const meQuery = useQuery(LOGGED_IN_QUERY);

  const adQuery = useQuery(AD_DETAIL_QUERY, {
    variables: { id: adID, pageNumber: pageIndex, pageSize: paging5pages },
  });

  async function handleDeleteAd() {
    await deleteAd();
    setModalShow(false);
    Router.push('/myAds');
  }

  if (adQuery.loading || meQuery.loading) return <Loading />;
  if (adQuery.error) return <ErrorMessage error={adQuery.error} />;

  const ad = adQuery.data.ad as Ad;
  const isMyAd = ad.creator && ad.creator.id === meQuery.data.me.id;

  return (
    <>
      <div>
        <Breadcrumb>
          <Link href={{ pathname: '/myAds' }} passHref>
            <Breadcrumb.Item>{translations.general.buy}</Breadcrumb.Item>
          </Link>
          <Breadcrumb.Item active>{translations.general.Ad}</Breadcrumb.Item>
        </Breadcrumb>

        <GeneralModal
          modalSubject={MainAppObject.ad}
          actionType={ModalAction.delete}
          show={modalShow}
          onClose={() => setModalShow(false)}
          onConfirm={() => handleDeleteAd()}
        />
        <Card style={{ marginBottom: '2rem', overflow: 'hidden' }}>
          <AdSummary
            adsQuery={AD_DETAIL_QUERY}
            key={ad.id}
            ad={ad}
            right={isMyAd && <MyAdOptions ad={ad} />}
          />
        </Card>
        {ad.offerCount > 0 && (
          <>
            <Tab className="active">
              {translations.offers.receivedOffers}
              {ad.offers && <TabBadge>{ad.offers.length}</TabBadge>}
            </Tab>
            <Card style={{ overflow: 'hidden' }}>
              <CarSummaries>
                {ad.offers &&
                  ad.offers.map((offer: Offer) => (
                    <CarSummary key={offer.id} car={offer.car} offer={offer} />
                  ))}
                <Paging
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                  maxItems={ad.offerCount}
                  itemsByPage={paging5pages}
                />
              </CarSummaries>
            </Card>
          </>
        )}
      </div>
    </>
  );
};
export default multi(AdDetail);
