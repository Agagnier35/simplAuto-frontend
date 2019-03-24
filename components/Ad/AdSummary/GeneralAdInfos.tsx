import React, { ReactNode } from 'react';
import { Ad, CarFeature, Offer } from '../../../generated/graphql';
import { Row, Col, Button } from 'react-bootstrap';
import {
  IoIosCar as CarIcon,
  IoIosTimer as KilometerIcon,
} from 'react-icons/io';
import { ColorCol, ButtonRow } from './styles';
import {
  FaQuestion as QuestionMark,
  FaDollarSign as DollarIcon,
} from 'react-icons/fa';
import { MdEvent as YearIcon } from 'react-icons/md';
import AdSummaryItem from './AdSummaryItem';
import { multi, MultiProps } from '../../../lib/MultiLang';
import Link from 'next/link';

export interface GeneralAdInfosProps extends MultiProps {
  ad: Ad;
  right: ReactNode;
  offer?: Offer;
}

const GeneralAdInfos = ({
  ad,
  right,
  translations,
  offer,
}: GeneralAdInfosProps) => {
  function findColor() {
    if (ad.features) {
      const colorFeature = ad.features.find(
        (feature: CarFeature) => feature.category.name === 'color',
      );
      return colorFeature && colorFeature.name;
    }
  }

  function getCarIcon() {
    const color = findColor();
    if (color) {
      return (
        <Link
          href={
            offer
              ? { pathname: '/offer', query: { id: offer.id } }
              : { pathname: '/adDetail', query: { id: ad.id } }
          }
        >
          <a>
            <CarIcon className="car-icon" style={{ color: findColor() }} />
          </a>
        </Link>
      );
    }
    return (
      <div>
        <span>
          <QuestionMark />
        </span>
        <Link
          href={
            offer
              ? { pathname: '/offer', query: { id: offer.id } }
              : { pathname: '/adDetail', query: { id: ad.id } }
          }
        >
          <a>
            <CarIcon
              className="car-icon"
              style={{ color: 'white', stroke: 'transparent' }}
            />
          </a>
        </Link>
      </div>
    );
  }

  return (
    <Col md={12}>
      <Row>
        <ColorCol md={2}>
          <Row>{getCarIcon()}</Row>
        </ColorCol>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <Row>
                <AdSummaryItem
                  icon={<DollarIcon />}
                  label={translations.cars.price}
                  value={`${ad.priceLowerBound ||
                    '-'} to ${ad.priceHigherBound || '-'}`}
                />
              </Row>
              <Row>
                <AdSummaryItem
                  icon={<KilometerIcon />}
                  label={translations.cars.mileage}
                  value={`${ad.mileageLowerBound ||
                    '-'} to ${ad.mileageHigherBound || '-'}`}
                />
              </Row>
              <Row>
                <AdSummaryItem
                  icon={<YearIcon />}
                  label={translations.cars.year}
                  value={`${ad.yearLowerBound || '-'} to ${ad.yearHigherBound ||
                    '-'}`}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={2}>
          <ButtonRow>{right}</ButtonRow>
        </Col>
      </Row>
    </Col>
  );
};

export default multi(GeneralAdInfos);
