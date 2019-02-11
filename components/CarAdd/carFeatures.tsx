import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


//Fetch all possible car features and put them in checkboxes. TODO: translate name
const GET_FEATURES = gql`
query{
    carFeatureCategories{
        id
        name
    }
}`;

const Features = () => (
    <Query query={GET_FEATURES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
          <div>
          {data.carFeatureCategories.map((feature: any) => (
          <label>
          <input type="checkbox" name="features" className="features" value={feature.id}/>
          {feature.name}
          </label>
          ))}
        </div>);
      }}
    </Query>
);
export default Features;
