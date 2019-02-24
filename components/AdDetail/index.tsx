import React from 'react';
import { Card, ListGroup, CardDeck } from 'react-bootstrap';
import Translations from '../../lib/MultiLang/locales/types';
import { multi } from '../../lib/MultiLang';
import { Query } from 'react-apollo';
import { Ad, CarFeature, Offer } from '../../generated/graphql';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';
import { useQuery } from 'react-apollo-hooks';
import { AD_DETAIL_QUERY } from './Queries';

export interface AdDetailProps {
  translations: Translations;
  AdID: string;
}

const AdDetail = ({ translations, AdID }: AdDetailProps) => {
  const { carFeatureCategory, carFeature } = translations;
  const { data, loading, error } = useQuery(AD_DETAIL_QUERY, {
    variables: { id: AdID },
  });
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  console.log(data);
  return (
    <CardDeck>
      <Card>
        <Card.Header>{translations.general.Ad}</Card.Header>
        <Card.Body>
          <div>
            {' '}
            {translations.Ads.manufacturer}:{' '}
            {data.ad.manufacturer ? data.ad.manufacturer.name : '-'}
          </div>
          <div>
            {' '}
            {translations.Ads.model}: {data.ad.model ? data.ad.model.name : '-'}
          </div>
          <div>
            {' '}
            {translations.Ads.category}:{' '}
            {data.ad.category ? data.ad.category.name : '-'}
          </div>
          <div>
            {' '}
            {translations.Ads.higherPrice}:{' '}
            {data.ad.priceHigherBound ? data.ad.priceHigherBound : '-'}
          </div>
          <div>
            {' '}
            {translations.Ads.lowerPrice}:{' '}
            {data.ad.priceLowerBound ? data.ad.priceLowerBound : '-'}
          </div>
          <div>
            {' '}
            {translations.Ads.higherMileage}:{' '}
            {data.ad.mileageHigherBound ? data.ad.mileageHigherBound : '-'}
          </div>
          <div>
            {' '}
            {translations.Ads.lowerMileage}:{' '}
            {data.ad.mileageLowerBound ? data.ad.mileageLowerBound : '-'}
          </div>
          <div>
            {' '}
            {translations.Ads.higherYear}:{' '}
            {data.ad.yearHigherBound ? data.ad.yearHigherBound : '-'}
          </div>
          <div>
            {' '}
            {translations.Ads.lowerYear}:{' '}
            {data.ad.yearLowerBound ? data.ad.yearLowerBound : '-'}
          </div>
          <ListGroup>
            {' '}
            {translations.Ads.features} :
            {data.ad.features &&
              data.ad.features.map((feature: CarFeature) => (
                <ListGroup.Item key={feature.category.name}>
                  {carFeatureCategory[feature.category.name]} :{' '}
                  {carFeature[feature.name] || feature.name}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header> {translations.general.offers}</Card.Header>
        <ListGroup>
          {data.ad.offers &&
            data.ad.offers.map((offer: Offer) => (
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
            ))}
        </ListGroup>
      </Card>
    </CardDeck>
  );
};
export default multi(AdDetail);
