import React, { FormEvent, Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './Form';
import { multi, MultiProps } from '../../lib/MultiLang';
import ErrorMessage from '../ErrorMessage/index';

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
    // Renvoie d'un JWTtoken qu'on stockera dans les cookies.
    this.setState({ email: '', password: '' });
  };

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  render() {
    const {
      translations: { login, general },
    } = this.props;

    return (
      <Mutation mutation={LOGIN_MUTATION} variables={this.state}>
        {(handleMutation, { loading, error }) => (
          <Form
            method="post"
            onSubmit={e => this.handleLogin(e, handleMutation)}
          >
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
            <ErrorMessage error={error} />
          </Form>
        )}
      </Mutation>
    );
  }
}

export default multi(Login);
