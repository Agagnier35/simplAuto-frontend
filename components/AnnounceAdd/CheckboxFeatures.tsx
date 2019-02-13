import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { multi, MultiProps } from '../../lib/MultiLang';
import { AdFeatureImportance } from '../../generated/graphql';

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
        const checkboxChoiceFeatures = data.carFeatureCategories.filter(function (el) {
          return el.type === "TRUE_FALSE"
        });
        return (
          <div>
            {checkboxChoiceFeatures.map((featureCategory: any) => (
              <tr>
                <td>{carFeatureCategory[featureCategory.name]}</td>
                <td>
                {featureCategory.features.slice(0,1).map((feature: any) => (
                    <input type="checkbox" name={feature.id} value={feature.id} onChange={(e) => handleChange('features',  {value: e.currentTarget.value, id: feature.id })}></input>
                    
                    ))}
                </td>
                <td>importance: </td>
                <td>
                  <select onChange={(e) => handleChange('categoryImportance', e.currentTarget.value)}>
                    {
                      Object.keys(AdFeatureImportance).map((level:any)=>(
                          <option key={level} value={level}>{level}</option>
                      ))
                    }    
                  </select>
                </td>
              </tr>
            ))}
          </div>);
      }}
    </Query>
  );
export default multi(CheckboxFeatures);