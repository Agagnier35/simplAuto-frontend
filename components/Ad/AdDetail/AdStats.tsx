import React from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import { useQuery } from 'react-apollo-hooks';
import { AD_STATS_QUERY } from './Queries';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { multi } from '../../../lib/MultiLang';
import { AdStatistics } from '../../../generated/graphql';

export interface AdStatsProps {
  adID: string;
  translations: Translations;
}

const AdStats = ({ adID, translations }: AdStatsProps) => {
  const { data, loading, error } = useQuery(AD_STATS_QUERY, {
    variables: { id: adID },
  });

  const stats: AdStatistics = data.statsForAds;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <div>
        <p>Stats for market:</p>
        <p>Average price: {stats.averagePrice}$</p>
        <p>Average time: {stats.averageTimeOnMarket} days</p>
      </div>
      <div>
        <p>Stats for Simplauto:</p>
        <p>Average price: ???</p>
        <p>Average time: ???</p>
      </div>
    </div>
  );
};

export default multi(AdStats);
