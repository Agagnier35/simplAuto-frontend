import React, { Component, FormEvent } from "react";
import { multi, MultiProps, Gender } from "../../lib/MultiLang";
import { Mutation } from "react-apollo";
import Form from "../Login/Form";
import gql from 'graphql-tag';
import ErrorMessage from '../ErrorMessage/index';


const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($data: data) {
    signup(data: $data) {
      id
    }
  }
`;
// Faire la totalité du shit puis demander à Alexandre pour faire la connexion avec le backend.
// Pour la location, utiliser une API. ou quelque chose
  

interface SignupState {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    confirmPassword: string;
    gender: Gender;
    birthDate: {
      day: number,
      month: number,
      year: number
    };
  }


class Signup extends Component<MultiProps, SignupState> {
    state : SignupState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: Gender.Other,
        birthDate: {
          day: 2,
          month: 2,
          year: 2019
        }
    }

    isStateSignupValid = () => {
        return this.state.firstName != "" &&
               this.state.lastName != ""  &&
               this.state.email != ""     &&
               this.state.password === this.state.confirmPassword;
    }

    handleSignup = async (e: FormEvent<HTMLFormElement>, signup: () => void) => {
        e.preventDefault();

        this.isStateSignupValid() ? await signup() : console.log("State not valid."); // Renvoyer une erreur au lieu d'un console.log
        // On va devoir envoyer un mail de vérification à la personne
        // lorsqu'elle se crée un compte.
        this.setState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: ""});
      };
    
      handleChange = (e: FormEvent<HTMLInputElement>) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
        console.log(this.state);
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
                        type="password"
                        name="confirmPassword"
                        placeholder={general.confirmPassword}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="gender">
                      {general.gender}  
                      <input type="radio" name="gender" onChange={this.handleChange} value={Gender.Male}  />{Gender.Male}
                      <input type="radio" name="gender" onChange={this.handleChange} value={Gender.Female}/>{Gender.Female}
                      <input type="radio" name="gender" onChange={this.handleChange} value={Gender.Other} />{Gender.Other}
                    </label>
                   
                    <label htmlFor="birthDate">
                      Birth Date
                      <input type="number" onChange={this.handleChange} name={general.birthDate.day} value={this.state.birthDate.day}/>
                      <input type="number" onChange={this.handleChange} name={general.birthDate.month} value={this.state.birthDate.month}/>
                      <input type="number" onChange={this.handleChange} name={general.birthDate.year} value={this.state.birthDate.year}/>
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