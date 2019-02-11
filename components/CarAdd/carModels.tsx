import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


//Fetch models for a manufacturer. TODO: pass the manufacturer to the query
const GET_MODELS = gql`
query{
    manufacturers{
        id
        name
        models{
            id
            name
        }
    }
}`;

const Models = () => (
    <Query query={GET_MODELS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data);
        return (
          <select name="models">
          <option disabled selected hidden>Please select</option>
            {data.manufacturers[0].models.map((models: any) => (
              <option key={models.id} value={models.id}>
                {models.name}
              </option>
            ))}
          </select>
        );
      }}
    </Query>
);
export default Models;


    