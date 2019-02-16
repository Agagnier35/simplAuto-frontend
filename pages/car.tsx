import React from 'react';
import { multi } from '../lib/MultiLang';
import Translations from '../lib/MultiLang/locales/types';
import gql from 'graphql-tag';
import Loading from '../components/Loading';
import CarDetails from '../components/CarDetails';
import ErrorMessage from '../components/ErrorMessage';
import { useQuery } from 'react-apollo-hooks';

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

export interface CarPageProps {
  translations: Translations;
  query: {
    id: String;
  };
}

const Car = ({ translations, query }: CarPageProps) => {
  const { data, error, loading } = useQuery(CAR_BY_ID, {
    variables: { id: query.id },
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2>{translations.cars.details}</h2>
      <CarDetails car={data.car} />
    </div>
  );
};

export default multi(Car);
