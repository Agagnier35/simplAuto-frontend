import React from 'react';
import { Car } from '../../../generated/graphql';
import { Container, Close } from './styles';
import Portal from '../../General/Portal';
import Carousel from 'react-bootstrap/Carousel';
import { MdClose } from 'react-icons/md';

export interface OfferImageModalProps {
  car: Car;
  opened: boolean;
  close: (value: boolean) => void;
}

const OfferImageModal = ({ car, opened, close }: OfferImageModalProps) => {
  if (!opened) return null;
  return (
    <Portal id="offerImageModal">
      <Container>
        <Close onClick={() => close(false)}>
          <MdClose />
        </Close>
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
