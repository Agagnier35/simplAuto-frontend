import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { multi, MultiProps } from '../../lib/MultiLang';

//Fetch all car makes and add them to a dropdown menu
interface CategoryProps {
  handleChange: any
}

const GET_MAKES_QUERY = gql`
  query {
    carCategories {
      id
      name
    }
  }
`;

const Categories = ({
  handleChange,
  translations: { general, cars },
}: MultiProps & CategoryProps) => (
    <Query query={GET_MAKES_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <ErrorMessage />;
        return (
          <div>
            <tr>
              <td>{cars.category}</td>
              <td>
                <select
                  onChange={e =>
                    handleChange('categoryID', e.currentTarget.value)
                  }
                >
                  <option disabled selected hidden>
                    {general.defaultDropdown}
                  </option>
                  {data.carCategories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </div>
        );
      }}
    </Query>
  );
export default multi(Categories);
