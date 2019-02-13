import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { multi, MultiProps } from '../../lib/MultiLang';
import { Table } from 'react-bootstrap';

interface DropboxFeatureProps {
  handleChange: any;
  features: any;
}

const GET_FEATURES = gql`
  query {
    carFeatureCategories {
      id
      name
      type
      features {
        id
        name
      }
    }
  }
`;

const DropDownFeatures = ({
  handleChange,
  features,
  translations: { general, carFeatureCategory },
}: MultiProps & DropboxFeatureProps) => (
  <Table>
    <div>
      {features.map((category: any) => (
        <tr>
          <td>{carFeatureCategory[category.name]}</td>
          <td>
            <select
              onChange={e =>
                handleChange('features', {
                  value: e.currentTarget.value,
                  category: category.name,
                })
              }
            >
              <option disabled selected hidden>
                {general.defaultDropdown}
              </option>
              {category.features.map((feature: any) => (
                <option key={feature.id} value={feature.id}>
                  {feature.name}
                </option>
              ))}
              <option>{general.none}</option>
            </select>
          </td>
        </tr>
      ))}
    </div>
  </Table>
);
export default multi(DropDownFeatures);
