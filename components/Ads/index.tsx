import React from 'react';
import { multi } from '../../lib/MultiLang';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import AdSummary from '../../components/AdSummary';
import { CardDeck } from 'react-bootstrap';
import { Ad } from '../../generated/graphql';
import { ALL_ADS_QUERY } from './Queries';
import { useQuery } from 'react-apollo-hooks';

const Ads = () => {
  const { data, error, loading } = useQuery(ALL_ADS_QUERY);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <CardDeck>
      {data.ads.map((ad: Ad) => (
        <AdSummary key={ad.id} ad={ad} />
      ))}
    </CardDeck>
  );
};

export default multi(Ads);
