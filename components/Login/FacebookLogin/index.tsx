import FacebookLogin from 'react-facebook-login';
import { Mutation } from 'react-apollo';
import { LOGGED_IN_QUERY } from '../../IsLoggedIn';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { multi, MultiProps, Gender } from '../../../lib/MultiLang';
import { SignupState } from '../../Signup';

const FACEBOOK_LOGIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;

class facebookLogin extends Component<MultiProps, SignupState> {
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

  responseFacebook = (response: any) => {
    console.log('HI');
    console.log(response);
    this.setState({
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
    });
    console.log(this.state);
  };

  render() {
    return (
      <Mutation
        mutation={FACEBOOK_LOGIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: LOGGED_IN_QUERY }]}
      >
        {() => (
          <FacebookLogin
            appId="1017021355164596"
            autoLoad={true}
            fields="first_name,name,last_name,email,gender,birthday,picture"
            callback={this.responseFacebook}
          />
        )}
      </Mutation>
    );
  }
}

export default multi(facebookLogin);
