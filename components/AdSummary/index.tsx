import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import { Ad, AdCarFeature } from '../../generated/graphql';
import StyledAdSummary from '../AdSummary/styles';

export interface AdSummaryProps {
  translations: Translations;
  ad: Ad;
}

const AdSummary = ({ translations, ad }: AdSummaryProps) => {
  const { Ads, carCategory, carFeatureCategory, carFeature } = translations;
  if (ad.status === 'PUBLISHED') {
    return (
      <Card>
        {ad ? (
          <StyledAdSummary>
            {ad.priceHigherBoundFeature && (
              <Card.Header>
                {Ads.higherPrice}: {ad.priceHigherBoundFeature.price}
              </Card.Header>
            )}
            <ListGroup>
              {ad.manufacturerFeature && (
                <ListGroup.Item>
                  {Ads.manufacturer}: {ad.manufacturerFeature.manufacturer.name}
                </ListGroup.Item>
              )}
              {ad.modelFeature && (
                <ListGroup.Item>
                  {Ads.model}: {ad.modelFeature.model.name}
                </ListGroup.Item>
              )}
              {ad.categoryFeature && (
                <ListGroup.Item>
                  {Ads.category}:{' '}
                  {carCategory[ad.categoryFeature.category.name] ||
                    ad.categoryFeature.category.name}
                </ListGroup.Item>
              )}
              {ad.features
                ? ad.features.map((feature: AdCarFeature) => (
                    <ListGroup.Item key={feature.feature.category.name}>
                      {carFeatureCategory[feature.feature.category.name]}:{' '}
                      {carFeature[feature.feature.name] || feature.feature.name}
                    </ListGroup.Item>
                  ))
                : null}
            </ListGroup>
          </StyledAdSummary>
        ) : null}
      </Card>
    );
  }
  return null;
};
export default multi(AdSummary);
