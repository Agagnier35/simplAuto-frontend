import React from 'react';
import { Ad, CarFeature } from '../../../generated/graphql';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Col, Row } from 'react-bootstrap';
import { AdFeatureItem } from './styles';

export interface AdFeaturesProps extends MultiProps {
  ad: Ad;
}

const AdFeatures = ({ ad, translations }: AdFeaturesProps) => {
  const { carFeature, carFeatureCategory } = translations;

  return (
    <Col md={12}>
      <Row>
        {ad.features &&
          ad.features.map((feature: CarFeature) => (
            <AdFeatureItem
              key={feature.category.name}
              icon={null}
              label={carFeatureCategory[feature.category.name]}
              value={carFeature[feature.name] || feature.name}
            />
          ))}
      </Row>
    </Col>
  );
};

export default multi(AdFeatures);
