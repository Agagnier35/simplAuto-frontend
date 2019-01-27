import { configure, addDecorator } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import results from '../jest-test-results.json';

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(
  withTests({
    results,
  }),
);

configure(loadStories, module);
