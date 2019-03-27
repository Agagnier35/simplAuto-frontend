import React, { useState } from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import {
  BigImage,
  Images,
  SmallImages,
  SmallImage,
  OfferFeatureItem,
  OfferFeatures,
  MoreImages,
  MoreAmount,
} from './styles';
import { multi } from '../../../lib/MultiLang';
import { Card } from 'react-bootstrap';
import { Car, CarFeature, CarFeatureType } from '../../../generated/graphql';
import GeneralModal from '../../General/GeneralModal';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useMutation } from 'react-apollo-hooks';
import FeatureIcon from '../../General/FeatureIcon';
import OfferImageModal from '../../Offer/OfferImageModal';

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
  const [imageModalOpened, setImageModalOpened] = useState(false);
  const deleteCar = useMutation(DELETE_CAR_MUTATION, {
    variables: { id: car.id },
  });

  async function handleDeleteCar(deleteCar: () => void) {
    await deleteCar();
    setShowModal(false);
    Router.push('/cars');
  }

  function getFeatureValue(feature: CarFeature) {
    if (feature.category.type === CarFeatureType.TrueFalse) {
      return carFeature[feature.name];
    }

    const featureCategoryTranslation = carFeature[feature.category.name];
    if (featureCategoryTranslation) {
      const featureTranslation = featureCategoryTranslation[feature.name];
      if (featureTranslation) {
        return featureTranslation;
      }
    }
    return feature.name;
  }

  const imageProps = {
    onClick: () => setImageModalOpened(true),
  };

  return (
    <>
      <GeneralModal
        modalSubject="car"
        actionType="delete"
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleDeleteCar(deleteCar)}
      />
      <OfferImageModal
        car={car}
        opened={imageModalOpened}
        close={setImageModalOpened}
      />
      <Images>
        <BigImage
          src={car.photos[0]}
          {...imageProps}
          imageCount={car.photos.length}
        />
        <SmallImages>
          {car.photos[1] && <SmallImage src={car.photos[1]} {...imageProps} />}
          {car.photos[2] && <SmallImage src={car.photos[2]} {...imageProps} />}
          {car.photos.length > 4 &&
            (car.photos[3] ? (
              <MoreImages {...imageProps}>
                <img src={car.photos[3]} />
                <MoreAmount>+ {car.photos.length - 4}</MoreAmount>
              </MoreImages>
            ) : (
              <SmallImage src={car.photos[3]} {...imageProps} />
            ))}
        </SmallImages>
      </Images>

      {/* <Button variant="danger" onClick={() => setShowModal(true)}>
        {general.delete}
      </Button> */}

      {car.features && car.features.length > 0 && (
        <div className="card-wrapper">
          <Card style={{ marginBottom: '1rem' }}>
            <Card.Body>
              <Card.Title>{general.features}</Card.Title>

              <OfferFeatures>
                {car.features.map((feature: CarFeature) => (
                  <OfferFeatureItem
                    key={feature.category.name}
                    icon={<FeatureIcon feature={feature} />}
                    label={carFeatureCategory[feature.category.name]}
                    value={getFeatureValue(feature)}
                  />
                ))}
              </OfferFeatures>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default multi(CarDetails);
