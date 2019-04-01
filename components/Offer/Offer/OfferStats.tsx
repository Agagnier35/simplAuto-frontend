import React from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import { useQuery } from 'react-apollo-hooks';
import { OFFER_STATS_QUERY } from './Queries';
import { Statistics, Offer } from '../../../generated/graphql';
import OfferPriceChart from '../../Stats/OfferPriceChart';
import { Row, Col } from 'react-bootstrap';
import DaysOnMarketChart from '../../Stats/DaysOnMarketChart';
import moment from 'moment';

export interface OfferStatsProps {
  offer: Offer;
}

const OfferStats = ({ offer }: OfferStatsProps) => {
  const { data, loading, error } = useQuery(OFFER_STATS_QUERY, {
    variables: { id: offer.id },
  });

  const stats: Statistics = data.statsForOffer;

  if (loading) return null;
  if (error) return null;

  const days = moment(offer.createdAt).diff(moment.now(), 'days');

  return (
    <Row style={{ marginTop: '1rem' }}>
      <Col md={12} lg={6}>
        <OfferPriceChart stats={stats} price={offer.price} />
      </Col>
      <Col md={12} lg={6}>
        <DaysOnMarketChart stats={stats} days={days} />
      </Col>
    </Row>
  );
};

export default OfferStats;
