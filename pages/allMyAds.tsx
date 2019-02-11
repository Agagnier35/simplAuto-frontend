import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage";
import GenerateMyAd from "./generateAllAd";

const ALL_MY_ADS_QUERY = gql`
query{
  me{
  ads{
    id
    creator{id}
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
}`

const MyAds = () => (
    <Query
      query={ALL_MY_ADS_QUERY}
    >
      {({ loading, error, data }) => {
        if (loading) return <Loading></Loading>;
        if (error) return <ErrorMessage></ErrorMessage>;

        return data.me.ads.map((currentAd : any) => (
            <GenerateMyAd key={currentAd.id} data={currentAd} />
        ));
      }}
    </Query>
  );
  export default MyAds
  
