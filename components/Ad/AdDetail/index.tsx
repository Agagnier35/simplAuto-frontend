import React, { useState } from 'react';
import { Card, Breadcrumb } from 'react-bootstrap';
import Translations from '../../../lib/MultiLang/locales/types';
import { multi } from '../../../lib/MultiLang';
import { Offer } from '../../../generated/graphql';
import ErrorMessage from '../../General/ErrorMessage';
import Loading from '../../General/Loading';
import { useQuery } from 'react-apollo-hooks';
import { AD_DETAIL_QUERY, AD_OFFER_SUGGESTION_QUERY } from './Queries';
import gql from 'graphql-tag';
import { CarSummaries } from '../../Car/Car/styles';
import CarSummary from '../../Car/CarSummary';
import { Tab } from '../Ads/styles';
import AdSummary from '../AdSummary';
import Paging from '../../General/Paging';
import AdStats from './AdStats';
import Link from 'next/link';
import { paging5pages } from '../../General/Preferences';
import MyAdOptions from '../MyAdOptions';
import { LOGGED_IN_QUERY } from '../../General/Header';
import YouMayLike from '../../Offer/YouMayLikeOffers';

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

  const meQuery = useQuery(LOGGED_IN_QUERY);

  const { data, loading, error } = useQuery(AD_DETAIL_QUERY, {
    variables: { id: adID, pageNumber: pageIndexLike, pageSize: paging5pages },
  });

  const youMayLikeQuery = useQuery(AD_OFFER_SUGGESTION_QUERY, {
    variables: {
      id: adID,
      pageNumber: pageIndexMayLike,
      pageSize: paging5pages,
    },
  });

  function youMayLikeCheck() {
    return (
      youMayLikeQuery.data &&
      youMayLikeQuery.data.suggestions &&
      youMayLikeQuery.data.suggestions[0] &&
      youMayLikeQuery.data.suggestions[0].totalLength > 0
    );
  }

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  const isMyAd =
    data.ad.creator &&
    meQuery.data.me &&
    data.ad.creator.id === meQuery.data.me.id;

  return (
    <>
      <div>
        <Breadcrumb>
          <Link href={{ pathname: '/myAds' }} passHref>
            <Breadcrumb.Item>{translations.general.buy}</Breadcrumb.Item>
          </Link>
          <Breadcrumb.Item active>{translations.general.Ad}</Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ marginBottom: '2rem', overflow: 'hidden' }}>
          <AdSummary
            adsQuery={AD_DETAIL_QUERY}
            key={data.ad.id}
            ad={data.ad}
            right={isMyAd && <MyAdOptions ad={data.ad} />}
          />
        </Card>

        <AdStats ad={data.ad} />    
    
        <Tab className="active">{translations.offers.receivedOffers}</Tab>
        <Card style={{ overflow: 'hidden' }}>
          <CarSummaries hidden={data.ad.offers && data.ad.offers.length === 0}>
            {data.ad.offers &&
              data.ad.offers.map((offer: Offer) => (
                <CarSummary key={offer.id} car={offer.car} offer={offer} />
              ))}
            <Paging
              pageIndex={pageIndexLike}
              setPageIndex={setPageIndexLike}
              maxItems={data.ad.offerCount}
              itemsByPage={paging5pages}
            />
          </CarSummaries>
          <div hidden={data.ad.offerCount !== 0}>
            <p>{translations.offers.noMatch}</p>
          </div>
          <div hidden={data.ad.offers.length === paging5pages}>
            {youMayLikeCheck() && (
              <YouMayLike
                translations={translations}
                data={youMayLikeQuery.data}
                loading={youMayLikeQuery.loading}
                error={youMayLikeQuery.error}
                pageIndexMayLike={pageIndexMayLike}
                setPageIndexMayLike={setPageIndexMayLike}
              />
            )}
          </div>
          <p
            hidden={
              data.ad.offers && data.ad.offers.length > 0 && !youMayLikeCheck()
            }
          >
            {translations.offers.noOffers}
          </p>
        </Card>
      </div>
    </>
  );
};
export default multi(AdDetail);
