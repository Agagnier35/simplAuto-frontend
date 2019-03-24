import React, { useState } from 'react';
import { multi, MultiProps } from '../../../lib/MultiLang';
import CarList from '../CarList';
import Loading from '../../General/Loading';
import ErrorMessage from '../../General/ErrorMessage';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useQuery } from 'react-apollo-hooks';
import { PAGE_CARS_QUERY } from './Queries';
import Paging from '../../General/Paging';

const Cars = ({ translations }: MultiProps) => {
  const CARS_NB_BY_PAGE = 5;
  const [pageIndex, setPageIndex] = useState(0);

  const { data, error, loading } = useQuery(PAGE_CARS_QUERY, {
    variables: { pageNumber: pageIndex, pageSize: CARS_NB_BY_PAGE },
  });

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
      <Paging
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        maxItems={data.me.carCount}
        itemsByPage={CARS_NB_BY_PAGE}
      />
    </div>
  );
};

export default multi(Cars);
