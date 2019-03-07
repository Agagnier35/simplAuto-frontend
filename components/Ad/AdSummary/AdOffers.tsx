import React from 'react';
import { Ad, CarFeature, Offer } from '../../../generated/graphql';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { Col, Row } from 'react-bootstrap';
import {
  AdFeatureItem,
  AdOfferItem,
  FirstPlace,
  Badge,
  SecondPlace,
  ThirdPlace,
} from './styles';
import AdSummaryItem from './AdSummaryItem';
import { IoIosTimer as KilometerIcon } from 'react-icons/io';

export interface AdOffersProps extends MultiProps {
  ad: Ad;
}

const AdOffers = ({ ad, translations }: AdOffersProps) => {
  const { carFeature, carFeatureCategory } = translations;

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
        ad.offers.slice(0, 3).map((offer: Offer, index: number) => (
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
                label="Kilometers"
                value={offer.car.mileage}
              />
            </div>
            <p className="price">{offer.price} $</p>
          </AdOfferItem>
        ))}
    </Col>
  );
};

export default multi(AdOffers);
