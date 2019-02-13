import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import { multi, MultiProps } from '../../lib/MultiLang';
import { AdFeatureImportance } from '../../generated/graphql';


const DropDownFeatures = ({
    handleChange,
    translations: { general, carFeatureCategory },
  }: MultiProps) => (
    <tr>
        <td>importance: </td>
        <td>
            <select onChange={(e) => handleChange('features',  {value: e.currentTarget.value})}>
                {
                    Object.keys(AdFeatureImportance).map((level:any)=>(
                        <option key={level} value={level}>{level}</option>
                    ))
                }    
            </select>
        </td>
    </tr>
  )