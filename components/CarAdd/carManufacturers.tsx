import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../lib/MultiLang';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';

//Fetch all manufacturers
interface ManufacturerProps {
  handleChange: any
}

const GET_MANUFACTURERS_QUERY = gql`
  query {
    manufacturers {
      id
      name
    }
  }
`;

const Manufacturers = ({
  handleChange,
  translations: { cars },
}: MultiProps & ManufacturerProps) => (
    <Query query={GET_MANUFACTURERS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <ErrorMessage />;
        return (
          <div>
            <tr>
              <td>{cars.manufacturer}</td>
              <td>
                <select
                  onChange={e =>
                    handleChange('manufacturerID', e.currentTarget.value)
                  }
                >
                  {data.manufacturers.map((manufacturer: any) => (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
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
export default multi(Manufacturers);
