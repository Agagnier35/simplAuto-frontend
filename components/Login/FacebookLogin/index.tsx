import FacebookLogin from 'react-facebook-login';
import { Mutation } from 'react-apollo';
import { LOGGED_IN_QUERY } from '../../IsLoggedIn';
import React, { FormEvent, Component } from 'react';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../../lib/MultiLang';

const FACEBOOK_LOGIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;

// function responseFacebook(response: any) {
//   loginOrSignup(response);
// }

const loginOrSignup = (response: any) => {
  console.log(response);
  // Vérifier que le facebook user id ne se trouve pas dans la database.
  // Si la réponse est valide
  //    S'il se trouve dans la database, login()
  //    S'il ne se trouve pas dans la database, signup()
  // Si la réponse est invalide
  //    Envoyer un message comme quoi la connexion facebook a échoué
};

// function componentClicked() {
//   console.log('clicked');
// }

// const facebookLogin = () => {
//   return (
//     <Mutation
//       mutation={FACEBOOK_LOGIN_MUTATION}
//       variables={null}
//       refetchQueries={[{ query: LOGGED_IN_QUERY }]}
//     >  {() => (
//       <FacebookLogin
//         appId="1017021355164596"
//         autoLoad={true}
//         fields="first_name,name,last_name,email,gender,birthday,picture"
//         onClick={componentClicked}
//         callback={responseFacebook}
//       />)}
//     </Mutation>
//   );
// };

class facebookLogin extends Component<MultiProps> {
  state = {};

  componentClicked = async (facebookLogin: () => void) => {
    console.log('Hello');
    // await facebookLogin();
  };

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
