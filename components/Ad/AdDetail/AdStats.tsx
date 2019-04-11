import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { AD_STATS_QUERY } from './Queries';
import { multi } from '../../../lib/MultiLang';
import { Statistics, Ad } from '../../../generated/graphql';
import moment from 'moment';
import { Row, Col, Card } from 'react-bootstrap';
import DaysOnMarketChart from '../../Stats/DaysOnMarketChart';
import AdPriceRangeChart from '../../Stats/AdPriceRangeChart/AdPriceRangeChart';
import ErrorMessage from '../../General/ErrorMessage';
import Translations from '../../../lib/MultiLang/locales/types';

export interface AdStatsProps {
  ad: Ad;
  translations: Translations;
}

const AdStats = ({ ad, translations }: AdStatsProps) => {
  const { data, loading, error } = useQuery(AD_STATS_QUERY, {
    variables: { id: ad.id },
  });

  const stats: Statistics = data.statsForAds;

  if (loading) return null;
  if (error) return <ErrorMessage error={error} />;

  const days = moment(ad.createdAt).diff(moment.now(), 'days');

  return (
    <Card style={{ marginBottom: '2rem', overflow: 'hidden' }}>
      <Card.Body>
        <Card.Title>{translations.admin.stats}</Card.Title>
        <Row style={{ marginTop: '1rem' }}>
          <Col md={12} lg={6}>
            <AdPriceRangeChart
              stats={stats}
              priceLower={ad.priceLowerBound}
              priceHigher={ad.priceHigherBound}
            />
          </Col>
          <Col md={12} lg={6}>
            <DaysOnMarketChart stats={stats} days={days} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default multi(AdStats);
