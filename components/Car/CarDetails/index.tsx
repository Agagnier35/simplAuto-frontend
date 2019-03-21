import React, { useState } from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import { BigImage, Images, SmallImages, SmallImage } from './styles';
import { multi } from '../../../lib/MultiLang';
import { Card } from 'react-bootstrap';
import { Car, CarFeature } from '../../../generated/graphql';
import GeneralModal from '../../General/GeneralModal';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useMutation } from 'react-apollo-hooks';
import { AdFeatureItem } from '../../Ad/AdSummary/styles';

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
  const { carFeatureCategory, carFeature, general } = translations;
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

      <Images>
        <BigImage src={car.photos[0]} alt="No car photos placeholder" />
        <SmallImages>
          <SmallImage src={car.photos[0]} alt="No car photos placeholder" />
          <SmallImage src={car.photos[0]} alt="No car photos placeholder" />
          <SmallImage src={car.photos[0]} alt="No car photos placeholder" />
        </SmallImages>
      </Images>

      {/* <Button variant="danger" onClick={() => setShowModal(true)}>
        {general.delete}
      </Button> */}

      <div className="card-wrapper">
        <Card style={{ marginBottom: '1rem' }}>
          <Card.Body>
            <Card.Title>{general.features}</Card.Title>

            {car.features.map((feature: CarFeature) => (
              <AdFeatureItem
                key={feature.category.name}
                icon={null}
                label={carFeatureCategory[feature.category.name]}
                value={carFeature[feature.name] || feature.name}
              />
            ))}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default multi(CarDetails);
