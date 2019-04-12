import React from 'react';
import { Ad, CarFeature, CarFeatureType } from '../../../generated/graphql';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Col, Row } from 'react-bootstrap';
import { AdFeatureItem } from './styles';
import FeatureIcon from '../../General/FeatureIcon';

export interface AdFeaturesProps extends MultiProps {
  ad: Ad;
}

const AdFeatures = ({ ad, translations }: AdFeaturesProps) => {
  const { carFeature, carFeatureCategory } = translations;

  function getFeatureValue(feature: CarFeature) {
    if (feature.category.type === CarFeatureType.True_False) {
      return carFeature[feature.name];
    }

    const featureCategoryTranslation = carFeature[feature.category.name];
    if (featureCategoryTranslation) {
      const featureTranslation = featureCategoryTranslation[feature.name];
      if (featureTranslation) {
        return featureTranslation;
      }
    }
    return feature.name;
  }

  return (
    <Col md={12}>
      <Row>
        {ad.features &&
          ad.features.map((feature: CarFeature) => (
            <AdFeatureItem
              key={feature.category.name}
              icon={<FeatureIcon feature={feature} />}
              label={carFeatureCategory[feature.category.name]}
              value={getFeatureValue(feature)}
            />
          ))}
      </Row>
    </Col>
  );
};

export default multi(AdFeatures);
