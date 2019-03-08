import { configure, addDecorator } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import { withInfo } from '@storybook/addon-info';
import results from '../jest-test-results.json';
import 'bootstrap/dist/css/bootstrap.css';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { theme, globalStyles } from '../components/General/Bootstrap/Theme';
import MultiLang from '../lib/MultiLang';

injectGlobal`
  ${globalStyles}
`;

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withInfo);

addDecorator(
  withTests({
    results,
  }),
);

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <MultiLang initialLocale="en">{story()}</MultiLang>
  </ThemeProvider>
));

configure(loadStories, module);
