import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { multi, MultiProps } from '../../lib/MultiLang';


//Fetch all car makes and add them to a dropdown menu
const GET_MAKES = gql`
query{
    carCategories{
        id
        name
    }
}`;

const Makes = ({
  handleChange,
  translations: { general, cars },
}: MultiProps) => (
    <Query query={GET_MAKES}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <ErrorMessage />;
        return (
          <div>
              <tr>
                <td>{cars.category}</td>
                <td>
                  <select onChange={(e) => handleChange('categoryID', { value: e.currentTarget.value})}>
                    <option disabled selected hidden>{general.defaultDropdown}</option>
                    {data.carCategories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>))}
                  </select>
                </td>
              </tr>
          </div>);
      }}
    </Query>
);
export default multi(Makes);


    