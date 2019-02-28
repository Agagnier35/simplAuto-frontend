import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Dropdown, Card, Form, InputGroup } from 'react-bootstrap';

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
  ))
  .add('Dropdown', () => (
    <div style={{ padding: 10 }}>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ))
  .add('Card', () => (
    <div style={{ padding: 10 }}>
      <Card style={{ width: '18rem' }}>
        <Card.Img
          variant="top"
          src="http://www.dieselstation.com/pics/2009-MTM-Audi-R8-in-Porsche-Green-car-walls.jpg"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  ))
  .add('Form', () => (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Form>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Email Adress
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  ));
