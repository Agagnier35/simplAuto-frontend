import React, { FormEvent, Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import StyledLogin from './styles';
import { multi, MultiProps } from '../../lib/MultiLang';
import { MdLockOutline } from 'react-icons/md';
import ErrorMessage from '../ErrorMessage/index';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import BrandHeader from './BrandHeader';
import Link from 'next/link';

interface LoginState {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;

class Login extends Component<MultiProps, LoginState> {
  state: LoginState = {
    email: '',
    password: '',
  };

  handleLogin = async (e: FormEvent<HTMLFormElement>, login: () => void) => {
    e.preventDefault();
    await login();
    this.setState({ email: '', password: '' });
  };

  handleChange = (e: FormEvent<any>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  render() {
    const {
      translations: { login, general, signup },
    } = this.props;
    return (
      <Mutation mutation={LOGIN_MUTATION} variables={this.state}>
        {(handleMutation, { loading, error }) => (
          <StyledLogin>
            <Card>
              <BrandHeader />
              <Card.Body>
                <Form
                  method="post"
                  onSubmit={(e: any) => this.handleLogin(e, handleMutation)}
                >
                  <fieldset disabled={loading} aria-busy={loading}>
                    <Form.Group>
                      <Form.Label>{general.email}</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            @
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          placeholder={general.email}
                          aria-describedby="inputGroupPrepend"
                          required
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {general.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{general.password}</Form.Label>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroupPrepend">
                            <MdLockOutline />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          aria-describedby="inputGroupPrepend"
                          required
                          type="password"
                          name="password"
                          placeholder={general.password}
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          {general.password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Link href="/forgot">
                      <a>Forgot your password ?</a>
                    </Link>
                    <Button variant="primary" type="submit" block>
                      {login.title}
                    </Button>

                    <Link href="/signup">
                      <a>
                        <Button variant="secondary" type="button" block>
                          {signup.title}
                        </Button>
                      </a>
                    </Link>
                  </fieldset>
                </Form>
              </Card.Body>
            </Card>
            <ErrorMessage error={error} />
          </StyledLogin>
        )}
      </Mutation>
    );
  }
}

export default multi(Login);

{
  /* <Form
  method="post"
  onSubmit={e => this.handleLogin(e, handleMutation)}
>
  <Card>
    <fieldset disabled={loading} aria-busy={loading}>
      <h2>{login.title}</h2>
      <label htmlFor="email">
        {general.email}
        <input
          type="email"
          name="email"
          placeholder={general.email}
          value={this.state.email}
          onChange={this.handleChange}
        />
      </label>
      <label htmlFor="password">
        {general.password}
        <input
          type="password"
          name="password"
          placeholder={general.password}
          value={this.state.password}
          onChange={this.handleChange}
        />
      </label>

      <button type="submit">{login.title}</button>
    </fieldset>
  </Card>
  <ErrorMessage error={error} />
</Form> */
}
