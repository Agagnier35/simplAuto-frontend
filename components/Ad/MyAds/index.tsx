import React from 'react';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Query } from 'react-apollo';
import Link from 'next/link';
import ErrorMessage from '../../General/ErrorMessage';
import Loading from '../../General/Loading';
import AdSummary from '../AdSummary';
import { CardDeck, Button } from 'react-bootstrap';
import { Ad } from '../../../generated/graphql';
import { ALL_MY_ADS_QUERY } from './Queries';

const MyAds = ({ translations }: MultiProps) => {
  return (
    <>
      <Link href="/createAd" prefetch>
        <Button>{translations.Ads.addAds}</Button>
      </Link>
      <CardDeck>
        <Query query={ALL_MY_ADS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <Loading />;
            if (error) return <ErrorMessage error={error} />;
            return data.me.ads.map((ad: Ad) => (
              <AdSummary adsQuery={ALL_MY_ADS_QUERY} key={ad.id} ad={ad} />
            ));
          }}
        </Query>
      </CardDeck>
    </>
  );
};

export default multi(MyAds);
