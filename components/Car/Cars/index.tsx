import React from 'react';
import { multi, MultiProps } from '../../../lib/MultiLang';
import CarList from '../CarList';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useQuery } from 'react-apollo-hooks';
import { MY_CARS_QUERY } from './Queries';
import PagingView from '../../General/Paging';

const Cars = ({ translations }: MultiProps) => {
  const { data, error, loading } = useQuery(MY_CARS_QUERY);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h2>{translations.cars.title}</h2>
      <Link href="/addcar" prefetch>
        <a>
          <Button style={{ marginBottom: '1rem' }}>
            {translations.cars.addCar}
          </Button>
        </a>
      </Link>
      <CarList cars={data.me.cars} />
      <PagingView />
    </div>
  );
};

export default multi(Cars);
