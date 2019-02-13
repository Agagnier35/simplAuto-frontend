import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../lib/MultiLang';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';

//Fetch all manufacturers

const GET_MANUFACTURERS = gql`
  query {
    manufacturers {
      id
      name
    }
  }
`;

const Manufacturers = ({
  handleChange,
  translations: { general, cars },
}: MultiProps) => (
  <Query query={GET_MANUFACTURERS}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <ErrorMessage />;
      return (
          <tr>
            <td>{cars.manufacturer}</td>
            <td>
              <select
                onChange={e =>
                  handleChange('manufacturerID', e.currentTarget.value)
                }
              >
                <option disabled selected hidden>
                  {general.defaultDropdown}
                </option>
                {data.manufacturers.map((manufacturer: any) => (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
      );
    }}
  </Query>
);
export default multi(Manufacturers);
