import React, { FormEvent, Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import StyledLogin from './styles';
import { multiUpdater, MultiProps } from '../../../lib/MultiLang';
import { MdLockOutline } from 'react-icons/md';
import ErrorMessage from '../../General/ErrorMessage';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import BrandHeader from './BrandHeader';
import Link from 'next/link';
import Router from 'next/router';
import { LOGGED_IN_QUERY } from '../../General/Header';
import LoginFacebook from './FacebookLogin';
import GoogleLogin from './GoogleLogin';

interface LoginState {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      language
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
    Router.push('/'); // On redirige l'utilisateur vers la home page après qu'il se soit connecté.
  };

  handleChange = (e: FormEvent<any>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  handleLanguage(data: any) {
    let locale = 'fr';
    if (data.language === 'ENGLISH') {
      locale = 'en';
    }
    this.props.changeLocale(locale);
  }

  render() {
    const {
      translations: { login, general, signup },
    } = this.props;

    return (
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: LOGGED_IN_QUERY }]}
        onCompleted={data => this.handleLanguage(data)}
      >
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
                    <Link href="/reset">
                      <a>Forgot your password ?</a>
                    </Link>
                    <Button variant="primary" type="submit" block>
                      {login.title}
                    </Button>

                    <LoginFacebook />
                    <GoogleLogin />

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

export default multiUpdater(Login);
