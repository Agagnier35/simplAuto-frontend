import React from 'react';
import { multi, MultiProps } from '../lib/MultiLang';
import gql from 'graphql-tag';
import CarList from '../components/CarList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useQuery } from 'react-apollo-hooks';

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
  const { data, error, loading } = useQuery(MY_CARS_QUERY);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2>{translations.cars.title}</h2>
      <Link href="/addcar">
        <Button>{translations.cars.addCar}</Button>
      </Link>
      {<CarList cars={data.me.cars} />}
    </div>
  );
};

export default multi(Cars);
