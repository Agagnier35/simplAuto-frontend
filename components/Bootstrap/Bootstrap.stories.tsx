import React from 'react';
import { storiesOf } from '@storybook/react';
import { ButtonToolbar, Button } from 'react-bootstrap';

storiesOf('Bootstrap', module)
  .addParameters({
    info: {
      text: `
        Bootstrap components
      `,
    },
  })
  .add('Buttons', () => (
    <div style={{ padding: 10 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="info">Info</Button>
      <Button variant="light">Light</Button>
      <Button variant="primary" size="lg">
        Primary Large
      </Button>
      <Button variant="primary" disabled>
        Primary Disabled
      </Button>
    </div>
  ));
// TODO 1. Add logged in story
// TODO 2. Add Premium user story
// TODO 3. Add Admin story
