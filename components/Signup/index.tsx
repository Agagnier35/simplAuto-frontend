import React, { Component, FormEvent } from 'react';
import { multi, MultiProps, Gender } from '../../lib/MultiLang';
import { Mutation } from 'react-apollo';
import Form from '../Login/Form';
import gql from 'graphql-tag';
import ErrorMessage from '../ErrorMessage/index';
import Geosuggest from 'react-geosuggest';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($data: UserSignupInput!) {
    signup(data: $data) {
      id
    }
  }
`;
// Faire la totalité du shit puis demander à Alexandre pour faire la connexion avec le backend.
// Pour la location, utiliser une API. ou quelque chose

interface BirthDate {
  day: number;
  month: number;
  year: number;
}

interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
  gender: Gender;
  birthDate: BirthDate;
}

class Signup extends Component<MultiProps, SignupState> {
  state: SignupState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    gender: Gender.Other,
    birthDate: {
      day: 1,
      month: 1,
      year: 1900,
    },
  };

  isBirthDateValid = () => {
    const date = new Date(
      this.state.birthDate.year,
      this.state.birthDate.month,
      this.state.birthDate.day,
    );
    return date.toString() !== 'Invalid Date';
  };

  isStateSignupValid = () => {
    return (
      this.state.firstName != '' &&
      this.state.lastName != '' &&
      this.state.email != '' &&
      this.state.location != '' &&
      this.state.password === this.state.confirmPassword &&
      this.isBirthDateValid()
    );
  };

  handleSignup = async (e: FormEvent<HTMLFormElement>, signup: () => void) => {
    e.preventDefault();

    this.isStateSignupValid()
      ? await signup()
      : console.log('State not valid.'); // Renvoyer une erreur au lieu d'un console.log
    // On va devoir envoyer un mail de vérification à la personne
    // lorsqu'elle se crée un compte.
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value } as any);
    console.log(this.state);
  };

  handleGeoLocChange = (e: string) => {
    this.state.location = e;
  };

  handleBirthDateChange = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'Day') {
      const newDate: BirthDate = {
        day: parseInt(e.currentTarget.value),
        month: this.state.birthDate.month,
        year: this.state.birthDate.year,
      };
      this.setState({ birthDate: newDate });
    } else if (e.currentTarget.name === 'Month') {
      const newDate: BirthDate = {
        day: this.state.birthDate.day,
        month: parseInt(e.currentTarget.value),
        year: this.state.birthDate.year,
      };
      this.setState({ birthDate: newDate });
    } else {
      const newDate: BirthDate = {
        day: this.state.birthDate.day,
        month: this.state.birthDate.month,
        year: parseInt(e.currentTarget.value),
      };
      this.setState({ birthDate: newDate });
    }
    console.log(this.state.birthDate);
  };

  getSignupPayload = () => {
    const { confirmPassword, ...userInfos } = this.state;
    return { data: userInfos };
  };

  render() {
    const {
      translations: { signup, general },
    } = this.props;
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.getSignupPayload()}>
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
              <br />
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
              <br />
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
              <br />
              <div>
                <p>Location: </p>
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBo5qmk1ucd5sr6Jm-3SWVup3ZIhfjxtnU&libraries=places" />
                <Geosuggest onChange={this.handleGeoLocChange} />
              </div>
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
              <br />
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
              <br />
              <label htmlFor="gender">
                {general.gender}
                <input
                  type="radio"
                  name="gender"
                  onChange={this.handleChange}
                  value={Gender.Male}
                />
                {Gender.Male}
                <input
                  type="radio"
                  name="gender"
                  onChange={this.handleChange}
                  value={Gender.Female}
                />
                {Gender.Female}
                <input
                  type="radio"
                  name="gender"
                  onChange={this.handleChange}
                  value={Gender.Other}
                />
                {Gender.Other}
              </label>
              <br />
              <label htmlFor="birthDate">
                Birth Date
                <input
                  type="number"
                  onChange={this.handleBirthDateChange}
                  name={general.birthDate.day}
                  value={this.state.birthDate.day}
                />
                <input
                  type="number"
                  onChange={this.handleBirthDateChange}
                  name={general.birthDate.month}
                  value={this.state.birthDate.month}
                />
                <input
                  type="number"
                  onChange={this.handleBirthDateChange}
                  name={general.birthDate.year}
                  value={this.state.birthDate.year}
                />
              </label>
              <br />
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
