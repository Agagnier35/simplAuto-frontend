import React, { useState } from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import { CarPortlet } from './styles';
import { Car, Offer } from '../../../generated/graphql';
import GeneralCarInfos from './GeneralCarInfos';
import CarFeatures from './CarFeatures';
import { Button } from 'react-bootstrap';
import { useMutation } from 'react-apollo-hooks';
import { DELETE_CAR_MUTATION } from '../CarDetails';
import GeneralModal, {
  MainAppObject,
  ModalAction,
} from '../../General/GeneralModal';
import { MdCancel } from 'react-icons/md';

export interface CarSummaryProp {
  translations: Translations;
  car: Car;
  offer?: Offer;
  carID: string;
}

const CarSummary = ({
  translations,
  car,
  offer,
  carID,
  ...otherProps
}: CarSummaryProp) => {
  const pages = [<GeneralCarInfos car={car} />];

  if (car.features && car.features.length > 0) {
    pages.push(<CarFeatures car={car} />);
  }

  const [modalShow, setModalShow] = useState(false);

  const deleteCar = useMutation(DELETE_CAR_MUTATION, {
    variables: {
      id: carID,
    },
  });

  async function handleDeleteCar(carID: string) {
    await deleteCar({
      variables: {
        id: carID,
      },
    });
    setModalShow(false);
  }

  return (
    <>
      <GeneralModal
        modalSubject={MainAppObject.car}
        actionType={ModalAction.delete}
        show={modalShow}
        onClose={() => setModalShow(false)}
        onConfirm={() => handleDeleteCar(car.id)}
      />
      <CarPortlet
        {...otherProps}
        title={`${car.manufacturer.name} ${car.model.name} ${car.year}`}
        interval={3000}
        href={
          offer
            ? { pathname: '/offer', query: { id: offer.id } }
            : { pathname: '/car', query: { id: car.id } }
        }
        pages={pages}
        image={<img src={car.photos[0]} />}
        right={
          <Button
            onClick={() => {
              setModalShow(true);
            }}
            variant="warning"
          >
            {translations.general.delete} <MdCancel />
          </Button>
        }
      />
    </>
  );
};

export default multi(CarSummary);
