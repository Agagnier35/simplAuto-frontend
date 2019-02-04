import React, { Component, FormEvent } from "react";
import { multi, MultiProps } from "../../lib/MultiLang";
import { Mutation } from "react-apollo";
import Form from "../Login/Form";
import gql from 'graphql-tag';
import ErrorMessage from '../ErrorMessage/index';


const LOGIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;


interface SignupState {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    confirmPassword: string;
  }

class Signup extends Component<MultiProps, SignupState> {
    state : SignupState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    handleSignup = async (e: FormEvent<HTMLFormElement>, signup: () => void) => {
        e.preventDefault();
        await signup();
        // On va devoir envoyer un mail de vérification à la personne
        // lorsqu'elle se crée un compte.
        this.setState({ firstName: "", lastName: "", email: '', password: '' });
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
                  onSubmit={e => this.handleSignup(e, handleMutation)}
                >
                  <fieldset disabled={loading} aria-busy={loading}>
                    <h2>Signup</h2>

                    <label htmlFor="firstName">
                        First Name
                      <input
                        type="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="lastName">
                      Last Name
                      <input
                        type="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                      />
                    </label>

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

export default multi(Signup);