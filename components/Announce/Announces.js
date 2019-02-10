import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Announce from "./Announce"

const Announces = () => (
    <Query
      query={gql` 
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
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.ads.map((currentAnnounce) => (
            <Announce ad={currentAnnounce} />
        ));
      }}
    </Query>
  );
  export default Announces
  
