import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Select from './';

storiesOf('Select', module)
  .addParameters({
    info: {
      text: `
        Select...
      `,
    },
  })
  .add('Base', () => (
    <div style={{ padding: '1rem' }}>
      <Select
        label="Select"
        options={[{ name: 'A' }, { name: 'B' }, { name: 'C' }]}
        accessor="name"
        handleChange={(item: any) => action(item.name)}
      />
    </div>
  ));
