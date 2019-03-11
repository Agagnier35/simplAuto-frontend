import React from 'react';
import { multi } from '../../../lib/MultiLang';
import ErrorMessage from '../../General/ErrorMessage';
import Loading from '../../General/Loading';
import AdSummary from '../../Ad/AdSummary';
import { Ad } from '../../../generated/graphql';
import { ALL_ADS_QUERY } from './Queries';
import { useQuery } from 'react-apollo-hooks';
import { AdSummaries } from './styles';
import { Card } from 'react-bootstrap';

const Ads = () => {
  const { data, error, loading } = useQuery(ALL_ADS_QUERY);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Card>
      <AdSummaries>
        {data.ads.map((ad: Ad) => (
          <AdSummary adsQuery={ALL_ADS_QUERY} key={ad.id} ad={ad} />
        ))}
      </AdSummaries>
    </Card>
  );
};

export default multi(Ads);
