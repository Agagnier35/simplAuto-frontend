import React from 'react';
import Car from '../components/Car';
import PrivateComponent from '../lib/Auth/PrivateComponent';
import { Query } from 'react-apollo';
import Ads from '../components/Ads';
import { Card, CardDeck } from 'react-bootstrap';

export interface CarPageProps {
  query: string;
}

class CarPage extends PrivateComponent<CarPageProps> {
  render() {
    return (
      <CardDeck>
        <Card>
          <Car query={this.props.query} />
        </Card>
        <Card>
          <Card.Body>
            <Ads />
          </Card.Body>
        </Card>
      </CardDeck>
    );
  }
}

export default CarPage;
