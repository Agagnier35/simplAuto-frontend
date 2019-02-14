import React from 'react';
import { multi, MultiProps } from '../lib/MultiLang';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CarList from '../components/CarList';
import IsLoggedIn from '../components/IsLoggedIn';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const MY_CARS_QUERY = gql`
  {
    me {
      id
      cars {
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
        photos
      }
    }
  }
`;

const Cars = ({ translations }: MultiProps) => {
  return (
    <IsLoggedIn>
      <Query query={MY_CARS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error} />;
          return (
            <div>
              <h2>{translations.cars.title}</h2>
              {<CarList cars={data.me.cars} />}
            </div>
          );
        }}
      </Query>
    </IsLoggedIn>
  );
};

export default multi(Cars);
