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
import ErrorMessage from '../../General/ErrorMessage';
import { myTopOffers } from '../../General/Preferences';

export interface AdOffersProps extends MultiProps {
  ad: Ad;
}

const AdOffers = ({ ad, translations }: AdOffersProps) => {
  const { data, loading, error } = useQuery(AD_OFFER_SUGGESTION_QUERY, {
    variables: {
      id: ad.id,
      pageNumber: 0,
      pageSize: myTopOffers,
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

  if (error) return <ErrorMessage error={error} />;

  return (
    <Col md={12}>
      {ad.offers &&
        ad.offers.slice(0, myTopOffers).map((offer: Offer, index: number) => (
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
      {ad.offers &&
        ad.offers.length < myTopOffers &&
        !loading &&
        !error &&
        data.suggestions &&
        data.suggestions
          .slice(0, myTopOffers - ad.offers.length)
          .map((suggestion: any, index: number) => (
            <AdOfferItem key={suggestion.offer.id}>
              <div className="image-wrapper">
                <img src={suggestion.offer.car.photos[0]} alt="" />
                {getRankBadge(index + 1 + ad.offers.length)}
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
      <p
        hidden={
          loading || (ad.offers && ad.offers.length > 0) || !data.suggestions
        }
      >
        {translations.offers.noOffers}
      </p>
    </Col>
  );
};

export default multi(AdOffers);
