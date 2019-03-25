import React from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import { useQuery } from 'react-apollo-hooks';
import { AD_STATS_QUERY } from './Queries';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { multi } from '../../../lib/MultiLang';
import { Statistics } from '../../../generated/graphql';

export interface AdStatsProps {
  adID: string;
  translations: Translations;
}

const AdStats = ({ adID, translations }: AdStatsProps) => {
  const { data, loading, error } = useQuery(AD_STATS_QUERY, {
    variables: { id: adID },
  });

  const stats: Statistics = data.statsForAds;
  const { stats: statsT } = translations;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <div>
        <p>{statsT.market}:</p>
        <p>
          {statsT.avgPrice}: {stats.averagePriceAPI}$
        </p>
        <p>
          {statsT.avgTime}: {stats.averageTimeOnMarketAPI}
        </p>
      </div>
      <div>
        <p>{statsT.app}:</p>
        <p>
          {statsT.avgPrice}: {stats.averagePriceApp}$
        </p>
        <p>
          {statsT.avgTime}: {stats.averageTimeOnMarketApp}
        </p>
      </div>
    </div>
  );
};

export default multi(AdStats);
