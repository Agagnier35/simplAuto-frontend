import React from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import { useQuery } from 'react-apollo-hooks';
import { OFFER_STATS_QUERY } from './Queries';
import { Statistics, Offer } from '../../../generated/graphql';
import OfferPriceChart from '../../Stats/OfferPriceChart';
import { Row, Col, Card } from 'react-bootstrap';
import DaysOnMarketChart from '../../Stats/DaysOnMarketChart';
import moment from 'moment';
import ErrorMessage from '../../General/ErrorMessage';
import { multi } from '../../../lib/MultiLang';

export interface OfferStatsProps {
  offer: Offer;
  translations: Translations;
}

const OfferStats = ({ offer, translations }: OfferStatsProps) => {
  const { data, loading, error } = useQuery(OFFER_STATS_QUERY, {
    variables: { id: offer.id },
  });

  const stats: Statistics = data.statsForOffer;

  if (loading) return null;
  if (error) return <ErrorMessage error={error} />;

  const days = moment(offer.createdAt).diff(moment.now(), 'days');

  return (
    <Card style={{ marginBottom: '2rem', overflow: 'hidden' }}>
      <Card.Body>
        <Card.Title>{translations.admin.stats}</Card.Title>
        <Row style={{ marginTop: '1rem' }}>
          <Col md={12} lg={6}>
            <OfferPriceChart stats={stats} price={offer.price} />
          </Col>
          <Col md={12} lg={6}>
            <DaysOnMarketChart stats={stats} days={days} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default multi(OfferStats);
