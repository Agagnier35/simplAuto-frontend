import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


//Fetch all car makes and add them to a dropdown menu
const GET_MAKES = gql`
query{
    carCategories{
        id
        name
    }
}`;

const Makes = () => (
    <Query query={GET_MAKES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data);
        return (
          <select name="makes">
          <option disabled selected hidden>Please select</option>
            {data.carCategories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        );
      }}
    </Query>
);
export default Makes;


    