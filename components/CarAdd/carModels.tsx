import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { multi, MultiProps } from '../../lib/MultiLang';

//Fetch models for a manufacturer. TODO: pass the manufacturer to the query
const GET_MODELS = gql`
  query {
    manufacturers {
      id
      name
      models {
        id
        name
      }
    }
  }
`;

const Models = ({
  handleChange,
  translations: { general, cars },
}: MultiProps) => (
  <Query query={GET_MODELS}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <ErrorMessage />;
      return (
        <div>
          <tr>
            <td>{cars.model}</td>
            <td>
              <select
                onChange={e => handleChange('modelID', e.currentTarget.value)}
              >
                <option disabled selected hidden>
                  {general.defaultDropdown}
                </option>
                {data.manufacturers[0].models.map((model: any) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
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
export default multi(Models);
