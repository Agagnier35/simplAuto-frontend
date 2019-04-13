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
import VehiclesSVG from '../../Svg/VehiclesSVG';
import { Empty, Wrapper, CarsIcons } from './styles';
import BuyCarSpot from '../BuyCarSpot';
import { IoIosCar as CarIcon } from 'react-icons/io';
import { LOGGED_IN_QUERY } from '../../General/Header';
import { Permission } from '../../../generated/graphql';

const Cars = ({ translations }: MultiProps) => {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, error, loading } = useQuery(PAGE_CARS_QUERY, {
    variables: { pageNumber: pageIndex, pageSize: paging5pages },
  });

  const meQuery = useQuery(LOGGED_IN_QUERY);

  function renderCarSpots() {
    const carSpots = [];

    if (meQuery.data.me.permissions.includes(Permission.Premium)) {
      return null;
    }

    for (let i = 0; i < data.me.carLimit; i += 1) {
      if (i < data.me.carCount) {
        carSpots.push(<CarIcon className="filled" />);
      } else {
        carSpots.push(<CarIcon className="empty" />);
      }
    }

    carSpots.reverse();

    return <CarsIcons>{carSpots}</CarsIcons>;
  }

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      {data.me && (
        <div>
          <Wrapper>
            <h2>{translations.cars.title}</h2>
            {renderCarSpots()}
          </Wrapper>
          <Wrapper style={{ marginBottom: '1rem' }}>
            {(data.me.carCount < data.me.carLimit ||
              meQuery.data.me.permissions.includes(Permission.Premium)) && (
              <Link href="/addcar" prefetch>
                <a>
                  <Button>{translations.cars.addCar}</Button>
                </a>
              </Link>
            )}

            {data.me.carLimit < 5 && <BuyCarSpot />}
          </Wrapper>

          {data.me.carCount > 0 ? (
            <>
              <CarList
                cars={data.me.cars}
                refetchQuery={{
                  query: PAGE_CARS_QUERY,
                  variables: { pageNumber: pageIndex, pageSize: paging5pages },
                }}
              />
              <Paging
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                maxItems={data.me.carCount}
                itemsByPage={paging5pages}
              />
            </>
          ) : (
            <Empty>
              <h3>{translations.cars.noCars}</h3>
              <VehiclesSVG />
            </Empty>
          )}
        </div>
      )}
    </>
  );
};

export default multi(Cars);
