import GoogleLogin from 'react-google-login';
import { Mutation } from 'react-apollo';
import { LOGGED_IN_QUERY } from '../../IsLoggedIn';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { multi, MultiProps, Gender } from '../../../lib/MultiLang';
import { BirthDate } from '../../Signup';

function responseGoogle(response: any) {
  loginOrSignup(response);
}

const loginOrSignup = (response: any) => {
  console.log(response);
  // Vérifier que le facebook user id ne se trouve pas dans la database.
  //      S'il se trouve dans la database, login()
  //      S'il ne se trouve pas dans la database, signup()
};

const googleLogin2 = () => {
  return (
    <GoogleLogin
      clientId="336221605230-o9967qlvh1121ublhs76bh9flm6kb3r8.apps.googleusercontent.com"
      buttonText="Login With Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  );
};

const GOOGLE_LOGIN_MUTATION = gql`
  mutation GOOGLE_LOGIN_MUTATION($data: UserSignupInput!) {
    googleLogin(data: $data) {
      id
    }
  }
`;

interface GoogleInfoState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  gender: Gender;
  birthDate: BirthDate;
  googleID: string;
}

class googleLogin extends Component<MultiProps, GoogleInfoState> {
  state: GoogleInfoState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    gender: Gender.Other,
    birthDate: {
      day: 1,
      month: 1,
      year: 1900,
    },
    googleID: '',
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
    return (
      <Mutation
        mutation={GOOGLE_LOGIN_MUTATION}
        variables={this.getSignupPayload()}
        refetchQueries={[{ query: LOGGED_IN_QUERY }]}
      >
        {handleMutation => (
          <GoogleLogin
            clientId="336221605230-o9967qlvh1121ublhs76bh9flm6kb3r8.apps.googleusercontent.com"
            buttonText="Login With Google"
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

export default multi(googleLogin);
