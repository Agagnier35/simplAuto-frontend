import React from 'react';
import { multi, MultiProps } from '../lib/MultiLang';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import IsLoggedIn from '../components/IsLoggedIn';
import ErrorMessage from "../components/ErrorMessage";
import Loading from '../components/Loading';
import GenerateAllAd from '../components/AllAds'
import { CardDeck } from 'react-bootstrap';

const MyAds = ({ translations }: MultiProps) => {

    const ALL_MY_ADS_QUERY = gql` 
    query{
        me{
            ads{
                id
                priceLowerBoundFeature{price}
                priceHigherBoundFeature{price}
                manufacturerFeature{manufacturer{name}}
                modelFeature{model{name}}
                categoryFeature{category{name}}
                mileageLowerBoundFeature{mileage}
                mileageHigherBoundFeature{mileage}
                yearLowerBoundFeature{year}
                yearHigherBoundFeature{year}
                features{feature{name,category{name}}}
                isUrgent
                isFirst
                status
                }
            }
        }
    `;

  return(
    <CardDeck>
        <Query query={ALL_MY_ADS_QUERY} >
        {({ data, loading, error }) => {
            if (loading) return <Loading></Loading>;
            if (error) return <ErrorMessage></ErrorMessage>;
            if (data.me == null) return null
            return data.me.ads.map((currentAd : any) => (
                <GenerateAllAd key={currentAd.id} data={currentAd} />
            ));
        }}
        </Query>
    </CardDeck>
  );
};

export default multi(MyAds);
