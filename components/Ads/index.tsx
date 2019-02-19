import React from 'react';
import { multi } from '../../lib/MultiLang';
import { Query } from 'react-apollo';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import AdSummary from '../../components/AdSummary';
import { CardDeck } from 'react-bootstrap';
import { Ad } from '../../generated/graphql';
import { ALL_ADS_QUERY } from './Queries';

const Ads = () => {
  return (
    <CardDeck>
      <Query query={ALL_ADS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          return data.ads.map((ad: Ad) => <AdSummary key={ad.id} ad={ad} />);
        }}
      </Query>
    </CardDeck>
  );
};

export default multi(Ads);
