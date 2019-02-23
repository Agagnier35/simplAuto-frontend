import React from 'react';
import Translations from '../../lib/MultiLang/locales/types';
import StyledCarDetails from './styles';
import { multi } from '../../lib/MultiLang';
import { Carousel, ListGroup, Card } from 'react-bootstrap';
import { Car } from '../../generated/graphql';

export interface CarDetailsProps {
  translations: Translations;
  car: Car;
}
const CarDetails = ({ translations, car }: CarDetailsProps) => {
  const {
    cars,
    carCategory,
    carFeatureCategory,
    carFeature,
    carLabel,
    general,
  } = translations;
  return (
    <StyledCarDetails>
      <div className="carouselSection">
        <Carousel>
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
      </div>

      <div className="card-wrapper">
        <div className="firstCardWrapper">
          <Card>
            <Card.Body>
              <Card.Title>
                <span className="card-number">1</span>
                {carLabel.general}
              </Card.Title>
              <label>
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
                </ListGroup>
              </label>
            </Card.Body>
          </Card>
        </div>

        <Card>
          <Card.Body>
            <Card.Title>
              <span className="card-number">2</span>
              {general.features}
            </Card.Title>
            <label>
              <ListGroup>
                {car.features.map((f: any) => (
                  <ListGroup.Item>
                    {carFeatureCategory[f.category.name]}:{' '}
                    {carFeature[f.name] || f.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </label>
          </Card.Body>
        </Card>
      </div>
    </StyledCarDetails>
  );
};

export default multi(CarDetails);
