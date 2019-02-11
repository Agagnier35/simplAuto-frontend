import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

//Fetch all manufacturers. TODO: Add translation to fix the default option value

const GET_MANUFACTURERS = gql`
query{
    manufacturers{
        id
        name
    }
}`;

const Manufacturers  = () => (
    <Query query={GET_MANUFACTURERS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data);
        return (
          <select name="manufacturers">
          <option disabled selected hidden>Please Select</option>
            {data.manufacturers.map((manufacturers: any) => (
              <option key={manufacturers.id} value={manufacturers.id}>
                {manufacturers.name}
              </option>
            ))}
          </select>
        );
      }}
    </Query>
);
export default Manufacturers;


    