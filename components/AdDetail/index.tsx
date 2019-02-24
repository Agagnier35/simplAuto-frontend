import React from 'react';
import { Card, ListGroup, CardDeck } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import { Query } from 'react-apollo';
import { Ad, CarFeature, Offer } from '../../generated/graphql';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';
import {AD_DETAIL_QUERY} from './Queries'

export interface AdDetailProps {
  translations: Translations;
  ad: Ad;
  id: string;
}

const AdDetail = ({ translations, ad, id }: AdDetailProps) => {
  const {carFeatureCategory, carFeature } = translations;
  return (
    <Query query={AD_DETAIL_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
      <CardDeck>  
      <Card>
        <Card.Header>{translations.general.myAds}</Card.Header>  
        <Card.Body> 
          <div> {translations.Ads.manufacturer}: {ad.manufacturer ? (ad.manufacturer.name) : '-'}</div>
          <div> {translations.Ads.model}: {ad.model ? (ad.model.name) : '-'}</div>
          <div> {translations.Ads.category}: {ad.category ? (ad.category.name) : '-'}</div>
          <div> {translations.Ads.higherPrice}: {ad.priceHigherBound ? (ad.priceHigherBound) : '-'}</div>
          <div> {translations.Ads.lowerPrice}: {ad.priceLowerBound ? (ad.priceLowerBound) : '-'}</div>
          <div> {translations.Ads.higherMileage}: {ad.mileageHigherBound ? (ad.mileageHigherBound) : '-'}</div>
          <div> {translations.Ads.lowerMileage}: {ad.mileageLowerBound ? (ad.mileageLowerBound) : '-'}</div>
          <div> {translations.Ads.higherYear}: {ad.yearHigherBound ? (ad.yearHigherBound) : '-'}</div>
          <div> {translations.Ads.lowerYear}: {ad.yearLowerBound? (ad.yearLowerBound) : '-'}</div>
          <ListGroup> {translations.Ads.features} :
            {ad.features
                    ? ad.features.map((feature: CarFeature) => (
                        <ListGroup.Item key={feature.category.name}>
                          {carFeatureCategory[feature.category.name]} : {' '}
                          {carFeature[feature.name] || feature.name}
                        </ListGroup.Item>
                      ))
                    : null}
          </ListGroup>
        </Card.Body>      
      </Card>
      <Card> 
        <Card.Header> {translations.general.offers}</Card.Header>
        <ListGroup> 
          {ad.offers &&
             (ad.offers.map((offer: Offer ) => (
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
              )))}
        </ListGroup> 
        </Card>
      </CardDeck>
      }}
     </Query>
  );
};
export default multi(AdDetail);
