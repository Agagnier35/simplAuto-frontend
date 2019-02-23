import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import { Ad, CarFeature } from '../../generated/graphql';

export interface AdSummaryProps {
  translations: Translations;
  ad: Ad;
}

const AdSummary = ({ translations, ad }: AdSummaryProps) => {
  const { Ads, carCategory, carFeatureCategory, carFeature } = translations;
  return (
    <div>
      {ad ? (
        <Card>
          {ad.priceHigherBound && (
            <Card.Header>
              {Ads.higherPrice}: {ad.priceHigherBound}
            </Card.Header>
          )}
          <ListGroup>
            {ad.manufacturer && (
              <ListGroup.Item>
                {Ads.manufacturer}: {ad.manufacturer.name}
              </ListGroup.Item>
            )}
            {ad.model && (
              <ListGroup.Item>
                {Ads.model}: {ad.model.name}
              </ListGroup.Item>
            )}
            {ad.category && (
              <ListGroup.Item>
                {Ads.category}:{' '}
                {carCategory[ad.category.name] || ad.category.name}
              </ListGroup.Item>
            )}
            {ad.features
              ? ad.features.map((feature: CarFeature) => (
                  <ListGroup.Item key={feature.category.name}>
                    {carFeatureCategory[feature.category.name]}:{' '}
                    {carFeature[feature.name] || feature.name}
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
