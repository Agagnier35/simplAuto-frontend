import FacebookLogin from 'react-facebook-login';
import { Mutation } from 'react-apollo';
import { LOGGED_IN_QUERY } from '../../IsLoggedIn';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../../lib/MultiLang';

const FACEBOOK_LOGIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;

class facebookLogin extends Component<MultiProps> {
  state = {};

  responseFacebook = (response: any) => {
    console.log(response);
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

// export default multi(Login);

export default multi(facebookLogin);
