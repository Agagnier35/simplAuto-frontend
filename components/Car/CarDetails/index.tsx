import React, { useState } from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import StyledCarDetails from './styles';
import { multi } from '../../../lib/MultiLang';
import { Carousel, Button, Card } from 'react-bootstrap';
import { Car, CarFeature } from '../../../generated/graphql';
import GeneralModal from '../../General/GeneralModal';
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
    carLabel,
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
      </div>
      <StyledCarDetails>
        <Carousel className="carouselSection">
          {car.photos.length > 0 ? (
            car.photos.map((photo: string, i: number) => (
              <Carousel.Item key={i}>
                <img src={photo} />
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

        <div className="card-wrapper">
          <Card>
            <Card.Body>
              <Card.Title>
                <span className="card-number">1</span>
                {carLabel.general}
              </Card.Title>
              <label>
                <p>
                  <b>{cars.manufacturer}</b>: {car.manufacturer.name}
                </p>
                <p>
                  <b>{cars.model}</b>: {car.model.name}
                </p>
                <p>
                  <b>{cars.category}</b>:{' '}
                  {carCategory[car.category.name] || car.category.name}
                </p>
                <p>
                  <b>{cars.year}</b>: {car.year}
                </p>
                <p>
                  <b>{cars.mileage}</b>: {car.mileage}
                </p>
              </label>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>
                <span className="card-number">2</span>
                {general.features}
              </Card.Title>
              <label>
                {car.features.map((f: CarFeature) => (
                  <p>
                    <b>{carFeatureCategory[f.category.name]}</b>:{' '}
                    {carFeature[f.name] || f.name}
                  </p>
                ))}
              </label>
              {car.description && (
                <p>
                  <b>Description :</b> {car.description}
                </p>
              )}
            </Card.Body>
          </Card>
        </div>
      </StyledCarDetails>
    </>
  );
};

export default multi(CarDetails);
