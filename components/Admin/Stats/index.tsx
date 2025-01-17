import React, { useState, FormEvent } from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import {
  Container,
  Title,
  OverallStats,
  SubTitle,
  CarSection,
  LocationSection,
  ResearchForm,
  Search,
  ResearchResults,
  APISection,
  AppSection,
  BestSellerSection,
  UserRankWrapper,
} from './styles';
import { useQuery } from 'react-apollo-hooks';
import { ADMIN_STATS, MANUFACTURERS, ADMIN_RESEARCH } from './Queries';
import { Form } from 'react-bootstrap';
import { Manufacturer, CarModel, Top10Car } from '../../../generated/graphql';
import Select from '../../General/Select';
import Geosuggest, { Suggest } from 'react-geosuggest';
import ApolloClient from 'apollo-client';
import UserSummary from '../../User/UserSummary';
import Top10CarSummary from '../Top10Car';
import Loading from '../../General/Loading';
import MinMaxAvgPriceChart from '../../Stats/MinMaxAvgPriceChart';
import MinMaxAvgDaysChart from '../../Stats/MinMaxAvgDaysChart';
import { ListContainer } from '../Top10Car/style';
import { FirstPlace } from '../../Ad/AdSummary/styles';

interface AdminStatsProps {
  translations: Translations;
  client: ApolloClient<any>;
}

const Stats = ({ translations, client }: AdminStatsProps) => {
  const [manufacturerID, setManufacturerID] = useState('');
  const [modelID, setModelID] = useState('');
  const [year, setYear] = useState(0);
  const [location, setLocation] = useState({
    name: '',
    longitude: 0,
    latitude: 0,
  });
  const [radius, setRadius] = useState(100);
  const [researchSubmittedOnce, setResearchSubmitted] = useState(false);

  const [researchResults, setResearchResults] = useState({
    adminStatisticsCar: {
      averagePriceAPI: 0,
      averageTimeOnMarketAPI: 0,
      lowestPriceSoldAPI: 0,
      highestPriceSoldAPI: 0,
      lowestTimeOnMarketAPI: 0,
      highestTimeOnMarketAPI: 0,

      soldOnApp: 0,
      averagePriceApp: 0,
      averageTimeOnMarketApp: 0,
      lowestPriceSoldApp: 0,
      highestPriceSoldApp: 0,
      lowestTimeOnMarketApp: 0,
      highestTimeOnMarketApp: 0,
    },
  });

  const { data: overallData, loading: loadingOverall } = useQuery(ADMIN_STATS);
  const { data: manufacturerData, loading: loadingManufaturer } = useQuery(
    MANUFACTURERS,
  );

  const getResearchPayload = () => {
    const data: any = {
      location,
      radius,
    };
    if (manufacturerID !== '') {
      data.manufacturerID = manufacturerID;
    }
    if (modelID !== '') {
      data.modelID = modelID;
    }
    if (year !== 0) {
      data.year = year;
    }
    return { data };
  };

  const getModelsForManufacturer = (manufacturers: Manufacturer[]) => {
    const currentManufacturer = manufacturers.find(
      m => m.id === manufacturerID,
    );
    return currentManufacturer ? currentManufacturer.models : [];
  };

  const handleChangeYear = (value: string) => {
    const re = /^[0-9\b]+$/;
    if (value === '') {
      setYear(0);
    }

    if (re.test(value)) {
      setYear(parseInt(value, 10));
    }
  };

  const handleChangeRadius = (value: string) => {
    const re = /^[0-9\b]+$/;
    if (value === '') {
      setRadius(0);
    }

    if (re.test(value)) {
      setRadius(parseInt(value, 10));
    }
  };

  const handleChangeGeoLoc = (suggest: Suggest | undefined) => {
    setLocation(
      suggest
        ? {
            name: suggest.label,
            longitude: parseFloat(suggest.location.lng),
            latitude: parseFloat(suggest.location.lat),
          }
        : {
            name: '',
            longitude: 0,
            latitude: 0,
          },
    );
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await client.query({
      query: ADMIN_RESEARCH,
      variables: getResearchPayload(),
    });
    setResearchResults(data);
    setResearchSubmitted(true);
  };

  const { admin, cars } = translations;
  return (
    <Container>
      <Title>{admin.stats}</Title>
      <SubTitle>{admin.overall}</SubTitle>
      {loadingOverall && <Loading style={{ marginLeft: '1.5rem' }} />}
      {!loadingOverall && (
        <OverallStats>
          {overallData && overallData.adminStats && (
            <>
              <h6>
                {admin.vehiculesCount}:{' '}
                {overallData.adminStats.allVehiculesCount}
              </h6>
              <h6>
                {admin.adsCount}: {overallData.adminStats.allAdsCount}
              </h6>
              <h6>
                {admin.activeUsers}: {overallData.adminStats.activeUsersCount}
              </h6>
              <h6>
                {admin.inactiveUsers}:{' '}
                {overallData.adminStats.inactiveUsersCount}
              </h6>
              <SubTitle>{admin.top10MakeModel}</SubTitle>
              <ListContainer>
                {overallData.adminStats.top10MostSoldMakeModel.map(
                  (t: Top10Car) => (
                    <Top10CarSummary key={t.make.id + t.model.id} car={t} />
                  ),
                )}
              </ListContainer>
              <SubTitle>{admin.top10Fastest}</SubTitle>
              <ListContainer>
                {overallData.adminStats.top10FastestSold.map((t: Top10Car) => (
                  <Top10CarSummary key={t.make.id + t.model.id} car={t} />
                ))}
              </ListContainer>
              <BestSellerSection>
                <SubTitle>{admin.bestSeller}</SubTitle>
                <UserRankWrapper>
                  <div className="image-wrapper">
                    <FirstPlace>1</FirstPlace>
                  </div>
                  <div style={{ flexGrow: 2 }}>
                    <UserSummary
                      className="user"
                      user={overallData.adminStats.bestSeller}
                    />
                  </div>
                </UserRankWrapper>
                <ListContainer>
                  {overallData.adminStats.top10FastestSold.map(
                    (t: Top10Car) => (
                      <Top10CarSummary key={t.make.id + t.model.id} car={t} />
                    ),
                  )}
                </ListContainer>
              </BestSellerSection>
            </>
          )}
        </OverallStats>
      )}
      <br />
      <SubTitle>{admin.carResearch}</SubTitle>
      {!loadingManufaturer && (
        <>
          <ResearchForm onSubmit={handleSearch}>
            <CarSection>
              <Select
                options={manufacturerData.manufacturers}
                accessor="name"
                handleChange={(item: Manufacturer) =>
                  setManufacturerID(item.id)
                }
                label={cars.manufacturer}
              />
              <Select
                options={getModelsForManufacturer(
                  manufacturerData.manufacturers,
                )}
                accessor="name"
                handleChange={(item: CarModel) => setModelID(item.id)}
                label={cars.model}
              />
              <label>
                {cars.year}
                <Form.Control
                  placeholder="Year"
                  aria-describedby="inputGroupPrepend"
                  type="number"
                  name="year"
                  value={year.toString()}
                  onChange={(e: any) => handleChangeYear(e.currentTarget.value)}
                />
              </label>
            </CarSection>
            <LocationSection>
              <label>
                {admin.location}
                <Geosuggest
                  onSuggestSelect={(suggest: Suggest) =>
                    handleChangeGeoLoc(suggest)
                  }
                  onChange={() => handleChangeGeoLoc(undefined)}
                />
              </label>
              <label>
                {admin.radius}
                <Form.Control
                  placeholder="Radius"
                  aria-describedby="inputGroupPrepend"
                  type="number"
                  name="radius"
                  value={radius.toString()}
                  onChange={(e: any) =>
                    handleChangeRadius(e.currentTarget.value)
                  }
                />
              </label>
            </LocationSection>
            <Search disabled={location.name === ''} type="submit">
              Search
            </Search>
          </ResearchForm>
          {researchSubmittedOnce && (
            <ResearchResults>
              <Title>{admin.results}</Title>
              <h5>
                {admin.numberSold}:{' '}
                {researchResults.adminStatisticsCar.soldOnApp}
              </h5>
              <APISection>
                <SubTitle>{admin.price}: </SubTitle>
                <MinMaxAvgPriceChart
                  stats={researchResults.adminStatisticsCar}
                />
              </APISection>
              <AppSection>
                <SubTitle>{admin.dom}: </SubTitle>
                <MinMaxAvgDaysChart
                  stats={researchResults.adminStatisticsCar}
                />
              </AppSection>
            </ResearchResults>
          )}
        </>
      )}
    </Container>
  );
};

export default multi(Stats);
