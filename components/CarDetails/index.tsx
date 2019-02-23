import React, { Component } from 'react';
import Translations from '../../lib/MultiLang/locales/types';
import StyledCarDetails from './styles';
import { multi } from '../../lib/MultiLang';
import { Carousel, ListGroup, Button } from 'react-bootstrap';
import { Car } from '../../generated/graphql';
import GeneralModal from '../GeneralModal';
import gql from 'graphql-tag';
import Router from 'next/router';
import { Mutation } from 'react-apollo';

export interface CarDetailsProps {
  translations: Translations;
  car: Car;
}

export interface CarDetailsState {
  showModal: boolean;
}

const DELETE_CAR = gql`
  mutation DELETE_CAR($id: ID!) {
    deleteCar(id: $id) {
      id
    }
  }
`;
class CarDetails extends Component<CarDetailsProps, CarDetailsState> {
  state: CarDetailsState = {
    showModal: false,
  };

  handleDeleteCar = async (deleteCar: () => void) => {
    await deleteCar();
    this.handleToggleModal(false);
    Router.push('/cars');
  };

  handleToggleModal = (showModal: boolean) => {
    this.setState({ showModal });
  };

  render() {
    const {
      cars,
      carCategory,
      carFeatureCategory,
      carFeature,
      general,
    } = this.props.translations;
    const car: Car = this.props.car;

    return (
      <Mutation mutation={DELETE_CAR} variables={{ id: car.id }}>
        {deleteCar => (
          <>
            <GeneralModal
              modalSubject="car"
              actionType="delete"
              show={this.state.showModal}
              onClose={this.handleToggleModal}
              onConfirm={() => this.handleDeleteCar(deleteCar)}
            />
            <div>
              <Button
                variant="danger"
                onClick={() => this.handleToggleModal(true)}
              >
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
                  {car.features.map((f: any) => (
                    <ListGroup.Item>
                      {carFeatureCategory[f.category.name]}:{' '}
                      {carFeature[f.name] || f.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </StyledCarDetails>
            </div>
          </>
        )}
      </Mutation>
    );
  }
}

export default multi(CarDetails);
