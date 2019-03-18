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
import { paging5pages } from '../../General/Preferences';

const Cars = ({ translations }: MultiProps) => {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, error, loading } = useQuery(PAGE_CARS_QUERY, {
    variables: { pageNumber: pageIndex, pageSize: paging5pages },
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
        itemsByPage={paging5pages}
      />
    </div>
  );
};

export default multi(Cars);
