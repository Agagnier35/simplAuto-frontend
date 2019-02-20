import React from 'react';
import { Card, ListGroup, CardDeck } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import { Ad, AdCarFeature, Offer } from '../../generated/graphql';
import Link from 'next/link';

export interface AdDetailProps {
  translations: Translations;
  ad: Ad;
}

const AdDetail = ({ translations, ad }: AdDetailProps) => {
  const { Ads, carCategory, carFeatureCategory, carFeature } = translations;
  return (
    <CardDeck>  
      <Card>
        <Card.Header>{translations.general.myAds}</Card.Header>  
        <Card.Body> 
          <div> {translations.Ads.manufacturer}: {ad.manufacturerFeature ? (ad.manufacturerFeature.manufacturer.name) : '-'}</div>
          <div> {translations.Ads.model}: {ad.modelFeature ? (ad.modelFeature.model.name) : '-'}</div>
          <div> {translations.Ads.category}: {ad.categoryFeature ? (ad.categoryFeature.category.name) : '-'}</div>
          <div> {translations.Ads.higherPrice}: {ad.priceHigherBoundFeature ? (ad.priceHigherBoundFeature.price) : '-'}</div>
          <div> {translations.Ads.lowerPrice}: {ad.priceLowerBoundFeature ? (ad.priceLowerBoundFeature.price) : '-'}</div>
          <div> {translations.Ads.higherMileage}: {ad.mileageHigherBoundFeature ? (ad.mileageHigherBoundFeature.mileage) : '-'}</div>
          <div> {translations.Ads.lowerMileage}: {ad.mileageLowerBoundFeature ? (ad.mileageLowerBoundFeature.mileage) : '-'}</div>
          <div> {translations.Ads.higherYear}: {ad.yearHigherBoundFeature ? (ad.yearHigherBoundFeature.year) : '-'}</div>
          <div> {translations.Ads.lowerYear}: {ad.yearLowerBoundFeature? (ad.yearLowerBoundFeature.year) : '-'}</div>
          <ListGroup> {translations.Ads.features} :
            {ad.features
                    ? ad.features.map((feature: AdCarFeature) => (
                        <ListGroup.Item key={feature.feature.category.name}>
                          {carFeatureCategory[feature.feature.category.name]} : {' '}
                          {carFeature[feature.feature.name] || feature.feature.name}
                        </ListGroup.Item>
                      ))
                    : null}
          </ListGroup>
        </Card.Body>      
      </Card>
      <Card> 
        <Card.Header> {translations.general.offers}</Card.Header>
        <ListGroup> 
          {ad.offers
            ? ad.offers.map((offer: Offer ) => (
              <ListGroup.Item key={offer.id}>
                  <Card>
                    {offer.car.photos.length > 0 ? (
                    <Card.Img variant="top" src={offer.car.photos[0]} />
                    ) : (
                    /* TODO: Change Placeholder */
                    <Card.Img variant="top" alt="No car photos placeholder" />
                    )}
                    
                   
                  </Card>
              </ListGroup.Item>
              ))
              : null}
        </ListGroup> 
        </Card>
    </CardDeck>
  );
};
export default multi(AdDetail);
