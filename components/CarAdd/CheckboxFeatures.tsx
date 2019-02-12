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

const CheckboxFeatures = ({
  handleChange,
  translations: { carFeatureCategory },
}: MultiProps) => (
    <Query query={GET_FEATURES}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <ErrorMessage />;
        let checkboxChoiceFeatures = data.carFeatureCategories.filter(function (el) {
          return el.type === "TRUE_FALSE"
        });
        return (
          <div>
            {checkboxChoiceFeatures.map((feature: any) => (
              <tr>
                <td>{carFeatureCategory[feature.name]}</td>
                <td>
                    <input type="checkbox" name={feature.id} value={feature.id} onChange={(e) => handleChange('features',  {value: e.currentTarget.value, category: feature.name })}></input>
                </td>
              </tr>
            ))}
          </div>);
      }}
    </Query>
  );
export default multi(CheckboxFeatures);