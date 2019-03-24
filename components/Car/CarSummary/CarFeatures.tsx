import React from 'react';
import { CarFeature, Car } from '../../../generated/graphql';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Col, Row } from 'react-bootstrap';
import { AdFeatureItem } from '../../Ad/AdSummary/styles';

export interface CarFeaturesProps extends MultiProps {
  car: Car;
}

const CarFeatures = ({ car, translations }: CarFeaturesProps) => {
  const { carFeature, carFeatureCategory } = translations;

  return (
    <Col md={12}>
      <Row>
        {car.features &&
          car.features.map((feature: CarFeature) => (
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

export default multi(CarFeatures);
