import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';
import { multi } from '../../../lib/MultiLang';
import { Offer } from '../../../generated/graphql';
import ErrorMessage from '../../General/ErrorMessage';
import Loading from '../../General/Loading';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { AD_DETAIL_QUERY, AD_OFFER_SUGGESTION_QUERY } from './Queries';
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
  const OFFER_NB_BY_PAGE = 5;
  const [pageIndexLike, setPageIndexLike] = useState(0);
  const [pageIndexMayLike, setPageIndexMayLike] = useState(0);

  const [modalShow, setModalShow] = useState(false);

  const deleteAd = useMutation(AD_DELETE_MUTATION, {
    variables: {
      id: adID,
      pageNumber: pageIndexLike,
      pageSize: OFFER_NB_BY_PAGE,
    },
  });

  async function handleDeleteAd(deleteAd: any) {
    await deleteAd();
    setModalShow(false);
    Router.push('/myAds');
  }

  const likeQuery = useQuery(AD_DETAIL_QUERY, {
    variables: { id: adID },
  });
  const mayLikeQuery = useQuery(AD_OFFER_SUGGESTION_QUERY, {
    variables: {
      id: adID,
      pageNumber: pageIndexMayLike,
      pageSize: OFFER_NB_BY_PAGE,
    },
  });
  const errors = likeQuery.error || mayLikeQuery.error;
  if (likeQuery.loading) return <Loading />;
  if (errors) return <ErrorMessage error={errors} />;

  return (
    <>
      <div>
        <GeneralModal
          modalSubject={MainAppObject.ad}
          actionType={ModalAction.delete}
          show={modalShow}
          onClose={() => setModalShow(false)}
          onConfirm={() => handleDeleteAd(deleteAd)}
        />
        <Card style={{ marginBottom: '2rem', overflow: 'hidden' }}>
          <AdSummary
            adsQuery={AD_DETAIL_QUERY}
            key={likeQuery.data.ad.id}
            ad={likeQuery.data.ad}
          />
        </Card>
        <Tab className="active">
          {translations.offers.receivedOffers}
          {likeQuery.data.ad.offers && (
            <TabBadge>{likeQuery.data.ad.offers.length}</TabBadge>
          )}
        </Tab>
        <Card style={{ overflow: 'hidden' }}>
          <p>you like</p>
          <CarSummaries>
            {likeQuery.data.ad.offers &&
              likeQuery.data.ad.offers.map((offer: Offer) => (
                <CarSummary key={offer.id} car={offer.car} offer={offer} />
              ))}
            <Paging
              pageIndex={pageIndexLike}
              setPageIndex={setPageIndexLike}
              maxItems={likeQuery.data.ad.offerCount}
              itemsByPage={OFFER_NB_BY_PAGE}
            />
          </CarSummaries>
          <hr />
          <p>you may also like</p>
          <div hidden={mayLikeQuery.loading}>
            <CarSummaries>
              {mayLikeQuery.data.suggestions &&
                mayLikeQuery.data.suggestions.map((suggestion: any) => (
                  <CarSummary
                    key={suggestion.offer.id}
                    car={suggestion.offer.car}
                    offer={suggestion.offer}
                  />
                ))}
              <Paging
                pageIndex={pageIndexMayLike}
                setPageIndex={setPageIndexMayLike}
                maxItems={likeQuery.data.ad.offerCount}
                itemsByPage={OFFER_NB_BY_PAGE}
              />
            </CarSummaries>
          </div>
          <div hidden={!mayLikeQuery.loading}>
            <Loading />
          </div>
        </Card>
      </div>
    </>
  );
};
export default multi(AdDetail);
