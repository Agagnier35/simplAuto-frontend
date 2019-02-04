import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from './index';

storiesOf('Header', module)
  .addParameters({
    info: {
      text: `
        Header/navigation/top-bar of the app.
      `,
    },
  })
  .add('When logged out', () => <Header />);
// TODO 1. Add logged in story
// TODO 2. Add Premium user story
// TODO 3. Add Admin story
