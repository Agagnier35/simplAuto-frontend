import React from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import { useQuery } from 'react-apollo-hooks';
import { OFFER_STATS_QUERY } from './Queries';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { multi } from '../../../lib/MultiLang';
import { Statistics } from '../../../generated/graphql';

export interface OfferStatsProps {
  offerID: string;
  translations: Translations;
}

const OfferStats = ({ offerID, translations }: OfferStatsProps) => {
  const { data, loading, error } = useQuery(OFFER_STATS_QUERY, {
    variables: { id: offerID },
  });

  const stats: Statistics = data.statsForOffer;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <div>
        <p>Stats for market:</p>
        <p>Average price: {stats.averagePriceAPI}$</p>
        <p>Average time: {stats.averageTimeOnMarketAPI} days</p>
      </div>
      <div>
        <p>Stats for Simplauto:</p>
        <p>Average price: {stats.averagePriceApp}$</p>
        <p>Average time: {stats.averageTimeOnMarketApp} days</p>
      </div>
    </div>
  );
};

export default multi(OfferStats);
