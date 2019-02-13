import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { multi, MultiProps } from '../../lib/MultiLang';

//Fetch models for a manufacturer
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
  manufacturer, 
  translations: { general, cars },
}: MultiProps) => (
  <Query query={GET_MODELS}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <ErrorMessage />;
      let manufacturerIndex = data.manufacturers.findIndex(
        (manufacturerIndex: any) => manufacturerIndex.id === manufacturer,
      );
      if (manufacturerIndex == -1) {manufacturerIndex = 0};
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
                {data.manufacturers[manufacturerIndex].models.map((model: any) => (
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
