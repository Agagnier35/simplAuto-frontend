import React from 'react';
import { Car } from '../../../generated/graphql';
import { Row, Col, Button } from 'react-bootstrap';
import {
  IoIosTimer as KilometerIcon,
  IoIosCar as OfferIcon,
} from 'react-icons/io';
import { FaDollarSign as DollarIcon } from 'react-icons/fa';

import { ButtonRow } from '../../Ad/AdSummary/styles';
import AdSummaryItem from '../../Ad/AdSummary/AdSummaryItem';

export interface GeneralCarInfosProps {
  car: Car;
  price?: number;
}

const GeneralCarInfos = ({ car, price }: GeneralCarInfosProps) => {
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
                    label="Price"
                    value={price}
                  />
                )}
              </Row>
              <Row>
                <AdSummaryItem
                  icon={<KilometerIcon />}
                  label="Kilometers"
                  value={car.mileage}
                />
              </Row>
              <Row>
                <AdSummaryItem
                  icon={<OfferIcon />}
                  label="Offers"
                  value={car.offers ? car.offers.length : 0}
                />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={2}>
          <ButtonRow>
            <Button variant="primary">Faire une offre</Button>

            <Button variant="light">Random action 1</Button>

            <Button variant="secondary">Random action 2</Button>
          </ButtonRow>
        </Col>
      </Row>
    </Col>
  );
};

export default GeneralCarInfos;
