import React from 'react';
import { multi, MultiProps } from '../../lib/MultiLang';
import { Table } from 'react-bootstrap';

interface DropboxFeatureProps {
  handleChange: any;
  features: any;
}

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
