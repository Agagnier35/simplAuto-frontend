import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import { Ad, AdCarFeature } from '../../generated/graphql';
import Select from '../Select';

export interface AdSummaryProps {
  translations: Translations;
  ad: Ad;
}

const AdSummary = ({ translations, ad }: AdSummaryProps) => {
  const { Ads, carCategory, carFeatureCategory, carFeature, general } = translations;

  const options = [{ option: general.options.delete, action: () => console.log('delete') }, { option: general.options.modify, action: () => console.log('modify') }];

  function handleChange(option: any) {
    option.action();
  };

  return (
    <div>
      {ad ? (
        <Card>
          <Select
            options={options}
            accessor="option"
            handleChange={(item: any) =>
              handleChange(item, ad.id)
            }
          />
          <ListGroup>
            {ad.priceHigherBoundFeature && (
              <ListGroup.Item>
                {Ads.higherPrice}: {ad.priceHigherBoundFeature.price}
              </ListGroup.Item>
            )}
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
        </Card>
      ) : null}
    </div>
  );
};
export default multi(AdSummary);
