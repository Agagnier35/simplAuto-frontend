import React, { useState } from 'react';
import { Card, Breadcrumb } from 'react-bootstrap';
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
import AdStats from './AdStats';
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
  const [pageIndexLike, setPageIndexLike] = useState(0);
  const [pageIndexMayLike, setPageIndexMayLike] = useState(0);

  const [modalShow, setModalShow] = useState(false);

  const deleteAd = useMutation(AD_DELETE_MUTATION, {
    variables: {
      id: adID,
    },
  });

  const meQuery = useQuery(LOGGED_IN_QUERY);

  async function handleDeleteAd() {
    await deleteAd();
    setModalShow(false);
    Router.push('/myAds');
  }

  const likeQuery = useQuery(AD_DETAIL_QUERY, {
    variables: { id: adID, pageNumber: pageIndexLike, pageSize: paging5pages },
  });
  const mayLikeQuery = useQuery(AD_OFFER_SUGGESTION_QUERY, {
    variables: {
      id: adID,
      pageNumber: pageIndexMayLike,
      pageSize: paging5pages,
    },
  });

  const errors = likeQuery.error || mayLikeQuery.error;
  if (likeQuery.loading) return <Loading />;
  if (errors) return <ErrorMessage error={errors} />;

  const isMyAd =
    likeQuery.data.ad.creator &&
    meQuery.data.me &&
    likeQuery.data.ad.creator.id === meQuery.data.me.id;

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
            key={likeQuery.data.ad.id}
            ad={likeQuery.data.ad}
            right={isMyAd && <MyAdOptions ad={likeQuery.data.ad} />}
          />
        </Card>
        <Card style={{ marginBottom: '2rem', overflow: 'hidden' }}>
          <Card.Body>
            <AdStats adID={adID} />
          </Card.Body>
        </Card>
        <Tab className="active">
          {translations.offers.receivedOffers}
          {likeQuery.data.ad.offers && (
            <TabBadge>{likeQuery.data.ad.offers.length}</TabBadge>
          )}
        </Tab>
        <Card style={{ overflow: 'hidden' }}>
          <div hidden={likeQuery.data.ad.offerCount > 0}>
            <CarSummaries>
              {likeQuery.data.ad.offers &&
                likeQuery.data.ad.offers.map((offer: Offer) => (
                  <CarSummary key={offer.id} car={offer.car} offer={offer} />
                ))}
              <Paging
                pageIndex={pageIndexLike}
                setPageIndex={setPageIndexLike}
                maxItems={likeQuery.data.ad.offerCount}
                itemsByPage={paging5pages}
              />
            </CarSummaries>
          </div>
          <div hidden={likeQuery.data.ad.offerCount === 0}>
            <p>{translations.offers.noMatch}:</p>
          </div>
          <hr />
          <div
            hidden={
              mayLikeQuery.loading ||
              (mayLikeQuery.data.suggestions[0] &&
                mayLikeQuery.data.suggestions[0].totalLength === 0)
            }
          >
            <p>{translations.offers.youMayLike}:</p>
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
                maxItems={
                  mayLikeQuery.data.suggestions &&
                  mayLikeQuery.data.suggestions[0]
                    ? mayLikeQuery.data.suggestions[0].totalLength
                    : 0
                }
                itemsByPage={paging5pages}
              />
            </CarSummaries>
          </div>
        </Card>
      </div>
    </>
  );
};
export default multi(AdDetail);
