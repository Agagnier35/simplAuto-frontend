import React from 'react';
import { Car } from '../../../generated/graphql';
import { Row, Col } from 'react-bootstrap';
import {
  IoIosTimer as KilometerIcon,
  IoIosCar as OfferIcon,
} from 'react-icons/io';
import { FaDollarSign as DollarIcon } from 'react-icons/fa';

import { ButtonRow } from '../../Ad/AdSummary/styles';
import AdSummaryItem from '../../Ad/AdSummary/AdSummaryItem';
import { multi, MultiProps } from '../../../lib/MultiLang';

export interface GeneralCarInfosProps extends MultiProps {
  car: Car;
  price?: number;
}

const GeneralCarInfos = ({
  car,
  price,
  translations,
}: GeneralCarInfosProps) => {
  return (
    <Col md={12}>
      <Row>
        <Col md={10}>
          <Row>
            <Col md={12}>
              <Row>
                {price && (
                  <AdSummaryItem
                    icon={<DollarIcon />}
                    label={translations.cars.price}
                    value={price}
                  />
                )}
              </Row>
              <Row>
                <AdSummaryItem
                  icon={<KilometerIcon />}
                  label={translations.cars.mileage}
                  value={car.mileage}
                />
              </Row>
              <Row>
                <AdSummaryItem
                  icon={<OfferIcon />}
                  label={translations.general.offers}
                  value={car.offers ? car.offers.length : 0}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={2}>
          <ButtonRow />
        </Col>
      </Row>
    </Col>
  );
};

export default multi(GeneralCarInfos);
