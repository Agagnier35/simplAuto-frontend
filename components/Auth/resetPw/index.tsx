import React, { FormEvent, Component } from 'react';
import gql from 'graphql-tag';
import { multi } from '../../../lib/MultiLang';
import { Mutation } from 'react-apollo';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import ErrorMessage from '../../General/ErrorMessage';
import StyledLogin from '../Login/styles';
import BrandHeader from '../Login/BrandHeader';
import { MdLockOutline } from 'react-icons/md';
import Translations from '../../../lib/MultiLang/locales/types';

const RESET_PW_REQUEST_MUTATION = gql`
  mutation RESET_PW_REQUEST_MUTATION($email: String!) {
    resetPasswordRequest(email: $email)
  }
`;

const RESET_PW_MUTATION = gql`
  mutation RESET_PW_MUTATION($resetToken: String!, $password: String!) {
    resetPassword(resetToken: $resetToken, password: $password) {
      id
    }
  }
`;

interface ResetPwState {
  email: string;
  newPassword: string;
}

interface ResetPwProps {
  resetToken: string;
  translations: Translations;
}

class ResetPw extends Component<ResetPwProps, ResetPwState> {
  state: ResetPwState = {
    email: '',
    newPassword: '',
  };

  handleResetPasswordRequest = async (
    e: FormEvent<any>,
    resetPasswordRequest: () => void,
  ) => {
    e.preventDefault();
    this.isResetPasswordRequestValid()
      ? await resetPasswordRequest()
      : this.setState({ email: '' });
    this.setState({ email: '' });
  };

  isResetPasswordRequestValid = () => {
    return this.state.email != '';
  };

  handleResetPassword = async (
    e: FormEvent<any>,
    resetPassword: () => void,
  ) => {
    e.preventDefault();
    this.isResetPasswordValid()
      ? await resetPassword()
      : this.setState({ newPassword: '' });
    this.setState({ newPassword: '' });
  };

  isResetPasswordValid = () => {
    return this.state.newPassword != '';
  };

  handleChange = (e: FormEvent<any>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  render() {
    const {
      translations: { general },
    } = this.props;

    if (this.props.resetToken) {
      return (
        <Mutation
          mutation={RESET_PW_MUTATION}
          variables={{
            resetToken: this.props.resetToken,
            password: this.state.newPassword,
          }}
        >
          {(handleMutation, { loading, error }) => (
            <StyledLogin>
              <Card>
                <BrandHeader />
                <Card.Body>
                  <Form
                    method="post"
                    onSubmit={(e: any) =>
                      this.handleResetPassword(e, handleMutation)
                    }
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
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
                            name="newPassword"
                            placeholder={general.password}
                            value={this.state.newPassword}
                            onChange={this.handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            {general.password}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      <Button variant="primary" type="submit" block>
                        {general.resetPw}
                      </Button>
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
    return (
      <Mutation
        mutation={RESET_PW_REQUEST_MUTATION}
        variables={{ email: this.state.email }}
      >
        {(handleMutation, { loading, error }) => (
          <StyledLogin>
            <Card>
              <BrandHeader />
              <Card.Body>
                <Form
                  method="post"
                  onSubmit={(e: any) =>
                    this.handleResetPasswordRequest(e, handleMutation)
                  }
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
                    <Button variant="primary" type="submit" block>
                      {general.resetPw}
                    </Button>
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

export default multi(ResetPw);
