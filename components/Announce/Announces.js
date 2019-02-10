import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Announce from "./Announce";

const Announces = () => (
    <Query
      query={gql` 
      query{
        ads{
          id
          features{feature{name,category{name}}}
          priceLowerBound
          priceHigherBound
          manufacturer{name}
          model{name}
          category{name}
          mileageLowerBound
          mileageHigherBound
          yearLowerBound
          yearHigherBound
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
  export default Announces;