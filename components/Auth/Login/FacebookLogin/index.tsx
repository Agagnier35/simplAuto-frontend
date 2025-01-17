import FacebookLogin from 'react-facebook-login';
import { Mutation } from 'react-apollo';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { multi, MultiProps, multiUpdater } from '../../../../lib/MultiLang';
import {
  Gender,
  Date as BirthDate,
  ClientType,
  UserLanguage,
  LocationInput,
} from '../../../../generated/graphql';
import { LOGGED_IN_QUERY } from '../../../General/Header';
import Router from 'next/router';

const FACEBOOK_LOGIN_MUTATION = gql`
  mutation FACEBOOK_LOGIN_MUTATION($data: UserSignupInput!) {
    facebookLogin(data: $data) {
      id
      carCount
      adCount
      language
    }
  }
`;

interface LoginFacebookState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: LocationInput;
  radius: number;
  language: UserLanguage;
  gender: Gender;
  birthDate: BirthDate;
  facebookID: string;
  clientType: ClientType;
}

class LoginFacebook extends Component<MultiProps, LoginFacebookState> {
  state: LoginFacebookState = {
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
    facebookID: '',
    clientType: ClientType.Individual,
    language:
      this.props.currentLocale === 'en'
        ? UserLanguage.English
        : UserLanguage.French,
  };

  responseFacebook = async (response: any, facebookLogin: () => any) => {
    if (response.first_name && response.last_name && response.email) {
      this.setState({
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        facebookID: response.userID,
      });
      const { data } = await facebookLogin();
      this.handlePostLogin(data);
    }
  };

  getSignupPayload = () => {
    const { ...userInfos } = this.state;
    return { data: userInfos };
  };

  responseFacebookFailed = (failure: any) => {
    Router.push('/login');
  };

  handlePostLogin = (data: any) => {
    this.handleLanguage(data);
    let page = '/myAds';
    if (data.facebookLogin.adCount < data.facebookLogin.carCount) {
      page = '/cars';
    }
    Router.push(page);
  };

  handleLanguage(data: any) {
    let locale = 'fr';
    if (data.facebookLogin.language === 'ENGLISH') {
      locale = 'en';
    }
    this.props.changeLocale(locale);
  }

  render() {
    const { translations } = this.props;
    return (
      <Mutation
        mutation={FACEBOOK_LOGIN_MUTATION}
        variables={this.getSignupPayload()}
        refetchQueries={[{ query: LOGGED_IN_QUERY }]}
      >
        {handleMutation => (
          <FacebookLogin
            appId="1017021355164596"
            icon="fa-facebook"
            language="fr_CA"
            textButton={translations.signup.facebookLogin}
            fields="first_name,name,last_name,email,gender,birthday,picture"
            onFailure={(failure: any) => this.responseFacebookFailed(failure)}
            callback={response =>
              this.responseFacebook(response, handleMutation)
            }
          />
        )}
      </Mutation>
    );
  }
}

export default multiUpdater(LoginFacebook);
