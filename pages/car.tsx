import React from 'react';
import { multi } from '../lib/MultiLang';
import Translations from '../lib/MultiLang/locales/types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../components/Loading';
import CarDetails from '../components/CarDetails';
import IsLoggedIn from '../components/IsLoggedIn';

export interface CarPageProps {
  translations: Translations;
  query: {
    id: String;
  };
}

const Car = ({ translations, query }: CarPageProps) => {
  const CAR_BY_ID = gql`
    query CAR_BY_ID($id: ID!) {
      car(id: $id) {
        id
        manufacturer {
          name
        }
        model {
          name
        }
        category {
          name
        }
        year
        mileage
        photos
        features {
          name
          category {
            name
          }
        }
      }
    }
  `;
  return (
    <div>
      <IsLoggedIn>
        <Query query={CAR_BY_ID} variables={{ id: query.id }}>
          {({ loading, data }) => {
            if (loading) {
              return <Loading />;
            }
            return (
              <div>
                <h2>{translations.cars.details}</h2>
                <CarDetails car={data.car} />
              </div>
            );
          }}
        </Query>
      </IsLoggedIn>
    </div>
  );
};

export default multi(Car);
