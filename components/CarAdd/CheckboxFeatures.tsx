import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { multi, MultiProps } from '../../lib/MultiLang';
import { Table } from 'react-bootstrap';

interface CheckboxFeatureProps {
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

const CheckboxFeatures = ({
  handleChange,
  features,
  translations: { carFeatureCategory },
}: MultiProps & CheckboxFeatureProps) => (
  <Table>
    <div>
      {features.map((featureCategory: any) => (
        <tr>
          <td>{carFeatureCategory[featureCategory.name]}</td>
          <td>
            <input
              type="checkbox"
              name={featureCategory.features[0].id}
              value={featureCategory.features[0].id}
              onChange={e =>
                handleChange('features', {
                  value: e.currentTarget.value,
                  category: featureCategory.features[0].name,
                })
              }
            />
          </td>
        </tr>
      ))}
    </div>
  </Table>
);
export default multi(CheckboxFeatures);
