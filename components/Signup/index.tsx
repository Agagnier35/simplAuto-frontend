import React, { Component, FormEvent } from "react";
import { multi, MultiProps } from "../../lib/MultiLang";
import { Mutation } from "react-apollo";
import Form from "../Login/Form";
import gql from 'graphql-tag';
import ErrorMessage from '../ErrorMessage/index';


const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
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

    isStateSignupValid = () => {
        return this.state.firstName != "" &&
               this.state.lastName != ""  &&
               this.state.email != ""     &&
               this.state.password === this.state.confirmPassword;
    }

    handleSignup = async (e: FormEvent<HTMLFormElement>, signup: () => void) => {
        e.preventDefault();
        if(this.isStateSignupValid()) {
            await signup();
        } else {
            // Message = Le status n'est pas valide.
            console.log("State not valid.");
        }
        
        // On va devoir envoyer un mail de vérification à la personne
        // lorsqu'elle se crée un compte.
        this.setState({ firstName: "", lastName: "", email: "", password: "" });
      };
    
      handleChange = (e: FormEvent<HTMLInputElement>) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
      };
    
    render() {  
        const {
            translations: { signup, general },
        } = this.props;
        return (
            <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
              {(handleMutation, { loading, error }) => (
                <Form
                  method="post"
                  onSubmit={e => this.handleSignup(e, handleMutation)}
                >
                  <fieldset disabled={loading} aria-busy={loading}>
                    <h2>{signup.title}</h2>

                    <label htmlFor="firstName">
                        {general.firstName}
                      <input
                        type="firstName"
                        name="firstName"
                        placeholder={general.firstName}
                        value={this.state.firstName}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="lastName">
                    {general.lastName}
                      <input
                        type="lastName"
                        name="lastName"
                        placeholder={general.lastName}
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

                    <label htmlFor="confirmPassword">
                      {general.confirmPassword}
                      <input
                        type="confirmPassword"
                        name="confirmPassword"
                        placeholder={general.confirmPassword}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                      />
                    </label>
      
                    <button type="submit">{signup.title}</button>
                  </fieldset>
                  <ErrorMessage error={error} />
                </Form>
              )}
            </Mutation>
          );
    }
}

export default multi(Signup);