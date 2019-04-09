import React, { useState } from 'react';
import { Car, Permission } from '../../../generated/graphql';
import { Row, Col, Button } from 'react-bootstrap';
import {
  IoIosTimer as KilometerIcon,
  IoIosCar as OfferIcon,
} from 'react-icons/io';
import { FaDollarSign as DollarIcon } from 'react-icons/fa';

import { ButtonRow } from '../../Ad/AdSummary/styles';
import AdSummaryItem from '../../Ad/AdSummary/AdSummaryItem';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { LOGGED_IN_QUERY } from '../../General/Header';
import { DELETE_CAR_MUTATION } from '../CarDetails';
import GeneralModal, {
  MainAppObject,
  ModalAction,
} from '../../General/GeneralModal';
import Router from 'next/router';

export interface GeneralCarInfosProps extends MultiProps {
  car: Car;
  price?: number;
  refetchQuery?: any;
}

const GeneralCarInfos = ({
  car,
  price,
  translations,
  refetchQuery,
}: GeneralCarInfosProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data, loading } = useQuery(LOGGED_IN_QUERY);

  const deleteCar = useMutation(DELETE_CAR_MUTATION, {
    variables: { id: car.id },
    update: updateAfterDelete,
  });

  async function handleDeleteCar() {
    await deleteCar();
    setShowDeleteModal(false);
    // TODO: Might have to route on an other page if on a cardetail page
  }

  function updateAfterDelete(cache: any, payload: any) {
    if (Router.pathname === '/user') {
      const data = cache.readQuery(refetchQuery);

      const id = payload.data.deleteCar.id;
      const cars = data.user.cars.filter((car: Car) => car.id !== id);

      cache.writeQuery({
        ...refetchQuery,
        data: {
          ...data,
          user: { ...data.user, cars, carCount: data.user.carCount - 1 },
        },
      });
    } else if (false) {
      const data = cache.readQuery(refetchQuery);

      const id = payload.data.deleteCar.id;
      const cars = data.user.cars.filter((car: Car) => car.id !== id);

      cache.writeQuery({
        ...refetchQuery,
        data: {
          ...data,
          user: { ...data.user, cars, carCount: data.user.carCount - 1 },
        },
      });
    }
  }

  if (loading) return null;

  const permissions = data.me.permissions;
  const isAdmin = permissions.includes(Permission.Admin);
  const isOwner = car.owner && data.me.id === car.owner.id;
  console.log(isOwner);

  return (
    <>
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
          {(isAdmin || (isOwner !== null && isOwner)) && (
            <Col md={2}>
              <ButtonRow>
                <Button onClick={() => setShowDeleteModal(true)}>
                  {translations.general.options.delete}
                </Button>
              </ButtonRow>
            </Col>
          )}
        </Row>
      </Col>
      <GeneralModal
        modalSubject={MainAppObject.car}
        actionType={ModalAction.delete}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDeleteCar()}
      />
    </>
  );
};

export default multi(GeneralCarInfos);
