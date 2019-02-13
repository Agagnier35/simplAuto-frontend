import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import { Ad, AdCarFeature } from '../../generated/graphql';

export interface AdSummaryProps {
  translations: Translations;
  ad: Ad;
}

const AdSummary = ({ translations, ad }: AdSummaryProps) => {
  const { Ads } = translations;
  return (
    <div>
      {ad ? (
        <Card>
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
                {Ads.category}: {ad.categoryFeature.category.name}
              </ListGroup.Item>
            )}
            {ad.features
              ? ad.features.map((feature: AdCarFeature) => (
                  <ListGroup.Item key={feature.id}>
                    {Ads.features}: {feature.feature.name}
                  </ListGroup.Item>
                ))
              : null}
          </ListGroup>
        </Card>
      ) : null}
    </div>
  );
};
export default multi(AdSummary);
