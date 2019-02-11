import React, { FormEvent, Component } from 'react';
// import { Mutation } from 'react-apollo';
// import gql from 'graphql-tag';
import gql from 'graphql-tag';
import Form from './Form';
import { multi, MultiProps } from '../../lib/MultiLang';
import { Mutation } from 'react-apollo';
import ErrorMessage from '../ErrorMessage';

// import ErrorMessage from '../ErrorMessage';


const RESET_PW_MUTATION = gql`
  mutation RESET_PW_MUTATION($email: String!) {
    resetPasswordRequest(email: $email) {
      id
    }
  }
`;


interface ResetPwState {
  email: string;
}

class ResetPw extends Component<MultiProps, ResetPwState> {
  state: ResetPwState = {
    email: ''
  };

  handleResetPw = async (e: FormEvent<HTMLFormElement>, resetPw: () => void) => {
    e.preventDefault();
    await resetPw();
    this.setState({ email: ''});
  };

  isResetPwStateValid = () => {
    return this.state.email != "";
  }

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  render() {
    const {
      translations: { general },
    } = this.props;

    return (
      <Mutation mutation={RESET_PW_MUTATION} variables={this.state}>
        {(handleMutation, { loading, error }) => (
          <Form method="post"
          onSubmit={e => this.handleResetPw(e, handleMutation)}>
            <fieldset>
              <h2>{general.resetPw}</h2>
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
              <button type="submit">{general.resetPw}</button>
            </fieldset>
            <ErrorMessage error={error} /> 
          </Form>)}
          </Mutation>
    );
  }
}

export default multi(ResetPw);
