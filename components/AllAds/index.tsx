import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../Loading"
import ErrorMessage from "../ErrorMessage";
import GenerateAd from "./GenerateAd";

const ALL_ADS_QUERY = gql` 
query{
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
`
const Ads = () => (
    <Query
      query={ALL_ADS_QUERY}
    >
      {({ loading, error, data }) => {
        if (loading) return <Loading></Loading>;
        if (error) return <ErrorMessage>Error :(</ErrorMessage>;

        return data.ads.map((currentAd : any) => (
            <GenerateAd key={currentAd.id} data={currentAd} />
        ));
      }}
    </Query>
  );
  export default Ads
  
