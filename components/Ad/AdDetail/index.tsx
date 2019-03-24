import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';
import { multi } from '../../../lib/MultiLang';
import { Offer } from '../../../generated/graphql';
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
import { paging5pages } from '../../General/Preferences';

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

  async function handleDeleteAd() {
    await deleteAd();
    setModalShow(false);
    Router.push('/myAds');
  }

  const { data, loading, error } = useQuery(AD_DETAIL_QUERY, {
    variables: { id: adID, pageNumber: pageIndex, pageSize: OFFER_NB_BY_PAGE },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <div>
        <GeneralModal
          modalSubject={MainAppObject.ad}
          actionType={ModalAction.delete}
          show={modalShow}
          onClose={() => setModalShow(false)}
          onConfirm={() => handleDeleteAd()}
        />
        <Card style={{ marginBottom: '2rem', overflow: 'hidden' }}>
          <AdSummary adsQuery={AD_DETAIL_QUERY} key={data.ad.id} ad={data.ad} />
        </Card>
        <Tab className="active">
          {translations.offers.receivedOffers}
          {data.ad.offers && <TabBadge>{data.ad.offers.length}</TabBadge>}
        </Tab>
        <Card style={{ overflow: 'hidden' }}>
          <CarSummaries>
            {data.ad.offers &&
              data.ad.offers.map((offer: Offer) => (
                <CarSummary key={offer.id} car={offer.car} offer={offer} />
              ))}
            <Paging
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              maxItems={data.ad.offerCount}
              itemsByPage={paging5pages}
            />
          </CarSummaries>
        </Card>
      </div>
    </>
  );
};
export default multi(AdDetail);
