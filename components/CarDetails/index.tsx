import React, { useState } from 'react';
import Translations from '../../lib/MultiLang/locales/types';
import StyledCarDetails from './styles';
import { multi } from '../../lib/MultiLang';
import { Carousel, ListGroup, Button } from 'react-bootstrap';
import { Car, CarFeature } from '../../generated/graphql';
import GeneralModal from '../GeneralModal';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useMutation } from 'react-apollo-hooks';

export interface CarDetailsProps {
  translations: Translations;
  car: Car;
}

export const DELETE_CAR_MUTATION = gql`
  mutation DELETE_CAR($id: ID!) {
    deleteCar(id: $id) {
      id
    }
  }
`;
const CarDetails = ({ translations, car }: CarDetailsProps) => {
  const {
    cars,
    carCategory,
    carFeatureCategory,
    carFeature,
    general,
  } = translations;

  const [showModal, setShowModal] = useState(false);
  const deleteCar = useMutation(DELETE_CAR_MUTATION, {
    variables: { id: car.id },
  });

  async function handleDeleteCar(deleteCar: () => void) {
    await deleteCar();
    setShowModal(false);
    Router.push('/cars');
  }

  return (
    <>
      <GeneralModal
        modalSubject="car"
        actionType="delete"
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleDeleteCar(deleteCar)}
      />
      <div>
        <Button variant="danger" onClick={() => setShowModal(true)}>
          {general.delete}
        </Button>
        <StyledCarDetails>
          <Carousel>
            {car.photos.length > 0 ? (
              car.photos.map((photo: string, i: number) => (
                <Carousel.Item key={i}>
                  <img className="d-block w-100" src={photo} />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                {/*TODO: change placeholder*/}
                <img
                  className="d-block w-100"
                  src="http://clipart-library.com/image_gallery/17559.jpg"
                  alt="No car photos placeholder"
                />
              </Carousel.Item>
            )}
          </Carousel>

          <ListGroup>
            <ListGroup.Item>
              {cars.manufacturer}: {car.manufacturer.name}
            </ListGroup.Item>
            <ListGroup.Item>
              {cars.model}: {car.model.name}
            </ListGroup.Item>
            <ListGroup.Item>
              {cars.category}:{' '}
              {carCategory[car.category.name] || car.category.name}
            </ListGroup.Item>
            <ListGroup.Item>
              {cars.year}: {car.year}
            </ListGroup.Item>
            <ListGroup.Item>
              {cars.mileage}: {car.mileage}
            </ListGroup.Item>
            {car.features.map((f: CarFeature) => (
              <ListGroup.Item>
                {carFeatureCategory[f.category.name]}:{' '}
                {carFeature[f.name] || f.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </StyledCarDetails>
      </div>
    </>
  );
};

export default multi(CarDetails);
