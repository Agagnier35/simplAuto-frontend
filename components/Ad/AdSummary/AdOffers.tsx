import React from 'react';
import { Ad, Offer } from '../../../generated/graphql';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Col } from 'react-bootstrap';
import {
  AdOfferItem,
  FirstPlace,
  Badge,
  SecondPlace,
  ThirdPlace,
  OfferPrice,
} from './styles';
import AdSummaryItem from './AdSummaryItem';
import { IoIosTimer as KilometerIcon } from 'react-icons/io';
import { useQuery } from 'react-apollo-hooks';
import { AD_OFFER_SUGGESTION_QUERY } from '../AdDetail/Queries';
import { paging5pages } from '../../General/Preferences';

export interface AdOffersProps extends MultiProps {
  ad: Ad;
}

const AdOffers = ({ ad, translations }: AdOffersProps) => {
  const { data, loading, error } = useQuery(AD_OFFER_SUGGESTION_QUERY, {
    variables: {
      id: ad.id,
      pageNumber: 0,
      pageSize: paging5pages,
    },
  });

  function getRankBadge(rank: number) {
    switch (rank) {
      case 1:
        return <FirstPlace>{rank}</FirstPlace>;
      case 2:
        return <SecondPlace>{rank}</SecondPlace>;
      case 3:
        return <ThirdPlace>{rank}</ThirdPlace>;
      default:
        return <Badge>{rank}</Badge>;
    }
  }

  return (
    <Col md={12}>
      {ad.offers &&
        ad.offers
          .reverse()
          .slice(0, 3)
          .map((offer: Offer, index: number) => (
            <AdOfferItem key={offer.id}>
              <div className="image-wrapper">
                <img src={offer.car.photos[0]} alt="" />
                {getRankBadge(index + 1)}
              </div>
              <div className="info-wrapper">
                <p>
                  {offer.car.manufacturer.name} {offer.car.model.name}{' '}
                  {offer.car.year}
                </p>
                <AdSummaryItem
                  icon={<KilometerIcon />}
                  label={translations.cars.mileage}
                  value={offer.car.mileage}
                />
              </div>
              <OfferPrice>{offer.price} $</OfferPrice>
            </AdOfferItem>
          ))}
      {console.log(ad.offers.length < 3 && !loading && data.suggestions)}
      {ad.offers.length < 3 &&
        !loading &&
        data.suggestions &&
        data.suggestions
          .reverse()
          .slice(0, 3)
          .map((suggestion: any, index: number) => (
            <AdOfferItem key={suggestion.offer.id}>
              <div className="image-wrapper">
                <img src={suggestion.offer.car.photos[0]} alt="" />
                {getRankBadge(index + 1)}
              </div>
              <div className="info-wrapper">
                <p>
                  {suggestion.offer.car.manufacturer.name}{' '}
                  {suggestion.offer.car.model.name} {suggestion.offer.car.year}
                </p>
                <AdSummaryItem
                  icon={<KilometerIcon />}
                  label={translations.cars.mileage}
                  value={suggestion.offer.car.mileage}
                />
              </div>
              <OfferPrice>{suggestion.offer.price} $</OfferPrice>
            </AdOfferItem>
          ))}
    </Col>
  );
};

export default multi(AdOffers);
