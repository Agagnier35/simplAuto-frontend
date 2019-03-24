import GoogleLogin from 'react-google-login';
import { Mutation } from 'react-apollo';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../../../lib/MultiLang';
import {
  Gender,
  Date as BirthDate,
  ClientType,
  Location,
} from '../../../../generated/graphql';
import { LOGGED_IN_QUERY } from '../../../General/Header';

const GOOGLE_LOGIN_MUTATION = gql`
  mutation GOOGLE_LOGIN_MUTATION($data: UserSignupInput!) {
    googleLogin(data: $data) {
      id
    }
  }
`;

interface LoginGoogleState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: Location;
  radius: number;
  gender: Gender;
  birthDate: BirthDate;
  googleID: string;
  clientType: ClientType;
}

class LoginGoogle extends Component<MultiProps, LoginGoogleState> {
  state: LoginGoogleState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: {
      name: '',
      latitude: 0,
      longitude: 0,
    },
    radius: 0,
    gender: Gender.Other,
    birthDate: {
      day: 1,
      month: 1,
      year: 1900,
    },
    googleID: '',
    clientType: ClientType.Individual,
  };

  responseGoogle = (response: any, googleLogin: () => void) => {
    if (response.first_name && response.last_name && response.email) {
      this.setState({
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        googleID: response.userID,
      });
      googleLogin();
    }
  };

  responseGoogleFailed = () => {
    // Afficher quelque chose pour signifier à l'utilisateur que l'opération a échoué
  };

  getSignupPayload = () => {
    const { ...userInfos } = this.state;
    return { data: userInfos };
  };

  render() {
    const { translations } = this.props;
    return (
      <Mutation
        mutation={GOOGLE_LOGIN_MUTATION}
        variables={this.getSignupPayload()}
        refetchQueries={[{ query: LOGGED_IN_QUERY }]}
      >
        {handleMutation => (
          <GoogleLogin
            className="google-login-btn"
            clientId="336221605230-o9967qlvh1121ublhs76bh9flm6kb3r8.apps.googleusercontent.com"
            buttonText={translations.signup.googleLogin}
            onSuccess={response =>
              this.responseGoogle(response, handleMutation)
            }
            onFailure={this.responseGoogleFailed}
          />
        )}
      </Mutation>
    );
  }
}

export default multi(LoginGoogle);
