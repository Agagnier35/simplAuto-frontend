import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { multi, MultiProps } from '../../lib/MultiLang';

const GET_FEATURES = gql`
query{
    carFeatureCategories{
        id
        name
        type
        features {
            id
            name
        }

    }
}`;

const DropDownFeatures = ({
  handleChange,
  translations: { general, carFeatureCategory },
}: MultiProps) => (
    <Query query={GET_FEATURES}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <ErrorMessage />;
        return (
          <div>
            {data.carFeatureCategories.map((category: any) => (
              <tr>
                <td>{carFeatureCategory[category.name]}</td>
                <td>
                  <select onChange={(e) => handleChange('features',  e.currentTarget.value, {category: category.name })}>
                    <option disabled selected hidden>{general.defaultDropdown}</option>
                    {category.features.map((feature: any) => (
                      <option key={feature.id} value={feature.id}>
                        {feature.name}
                      </option>))}
                  </select>
                </td>
              </tr>
            ))}
          </div>);
      }}
    </Query>
  );
export default multi(DropDownFeatures);

