import GoogleLogin from 'react-google-login';
import { Mutation } from 'react-apollo';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { multi, MultiProps, multiUpdater } from '../../../../lib/MultiLang';
import {
  Gender,
  Date as BirthDate,
  ClientType,
  Location,
  LocationInput,
  UserLanguage,
} from '../../../../generated/graphql';
import { LOGGED_IN_QUERY } from '../../../General/Header';
import Router from 'next/router';

const GOOGLE_LOGIN_MUTATION = gql`
  mutation GOOGLE_LOGIN_MUTATION($data: UserSignupInput!) {
    googleLogin(data: $data) {
      id
      carCount
      adCount
    }
  }
`;

interface LoginGoogleState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: LocationInput;
  radius: number;
  gender: Gender;
  birthDate: BirthDate;
  googleID: string;
  clientType: ClientType;
  language: UserLanguage;
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
    radius: 100,
    gender: Gender.Other,
    birthDate: {
      day: 1,
      month: 1,
      year: 1900,
    },
    googleID: '',
    clientType: ClientType.Individual,
    language:
      this.props.currentLocale === 'en'
        ? UserLanguage.English
        : UserLanguage.French,
  };

  responseGoogle = async (response: any, googleLogin: () => any) => {
    if (
      response.googleId &&
      response.profileObj.email &&
      response.profileObj.familyName &&
      response.profileObj.givenName
    ) {
      this.setState({
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
        googleID: response.googleId,
      });
      const { data } = await googleLogin();
      this.handlePostLogin(data);
    }
  };

  responseGoogleFailed = (failure: any) => {
    Router.push('/login');
  };

  handlePostLogin = (data: any) => {
    this.handleLanguage(data);
    let page = '/myAds';
    if (data.googleLogin.adCount < data.googleLogin.carCount) {
      page = '/cars';
    }
    Router.push(page);
  };

  handleLanguage(data: any) {
    let locale = 'fr';
    if (data.googleLogin.language === 'ENGLISH') {
      locale = 'en';
    }
    this.props.changeLocale(locale);
  }

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
            onFailure={(failure: any) => this.responseGoogleFailed(failure)}
            cookiePolicy={'single_host_origin'}
          />
        )}
      </Mutation>
    );
  }
}

export default multiUpdater(LoginGoogle);
