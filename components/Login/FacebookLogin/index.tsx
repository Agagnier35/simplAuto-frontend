import FacebookLogin from 'react-facebook-login';
import { Mutation } from 'react-apollo';
import { LOGGED_IN_QUERY } from '../../IsLoggedIn';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { multi, MultiProps, Gender } from '../../../lib/MultiLang';
import { BirthDate } from '../../Signup';

const FACEBOOK_LOGIN_MUTATION = gql`
  mutation FACEBOOK_LOGIN_MUTATION($data: UserSignupInput!) {
    facebookLogin(data: $data) {
      id
    }
  }
`;

interface FaebookInfoState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  gender: Gender;
  birthDate: BirthDate;
  facebookID: string;
}

class facebookLogin extends Component<MultiProps, FaebookInfoState> {
  state: FaebookInfoState = {
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
    facebookID: '',
  };

  responseFacebook = (response: any, facebookLogin: () => void) => {
    if (response.first_name && response.last_name && response.email) {
      this.setState({
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        facebookID: response.userID,
      });
      facebookLogin();
    }
  };

  getSignupPayload = () => {
    const { ...userInfos } = this.state;
    return { data: userInfos };
  };

  render() {
    return (
      <Mutation
        mutation={FACEBOOK_LOGIN_MUTATION}
        variables={this.getSignupPayload()}
        refetchQueries={[{ query: LOGGED_IN_QUERY }]}
      >
        {handleMutation => (
          <FacebookLogin
            appId="1017021355164596"
            autoLoad={true}
            fields="first_name,name,last_name,email,gender,birthday,picture"
            callback={response =>
              this.responseFacebook(response, handleMutation)
            }
          />
        )}
      </Mutation>
    );
  }
}

export default multi(facebookLogin);
