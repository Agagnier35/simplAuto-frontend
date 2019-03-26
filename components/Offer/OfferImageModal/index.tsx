import React from 'react';
import { Car } from '../../../generated/graphql';
import { Container } from './styles';
import Portal from '../../General/Portal';
import Carousel from 'react-bootstrap/Carousel';

export interface OfferImageModalProps {
  car: Car;
}

const OfferImageModal = ({ car }: OfferImageModalProps) => {
  return (
    <Portal id="offerImageModal">
      <Container>
        <Carousel>
          {car.photos.map((photo: string) => (
            <Carousel.Item>
              <img className="d-block" src={photo} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </Portal>
  );
};

export default OfferImageModal;
