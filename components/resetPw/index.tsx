import React, { FormEvent, Component } from 'react';
// import { Mutation } from 'react-apollo';
// import gql from 'graphql-tag';
import Form from './Form';
import { multi, MultiProps } from '../../lib/MultiLang';

// import ErrorMessage from '../ErrorMessage';

interface ResetPwState {
  email: string;
}

class ResetPw extends Component<MultiProps, ResetPwState> {
  state: ResetPwState = {
    email: ''
  };

  handleResetPw = async (e: FormEvent<HTMLFormElement>, login: () => void) => {
    e.preventDefault();
    await login();
    this.setState({ email: ''});
  };

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
  };

  render() {
    const {
      translations: { general },
    } = this.props;

    return (
          <Form method="post">
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
            {/* <ErrorMessage error={error} /> */}
          </Form>
    );
  }
}

export default multi(ResetPw);
