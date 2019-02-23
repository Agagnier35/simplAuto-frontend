import FacebookLogin from 'react-facebook-login';
import * as React from 'react';

function responseFacebook(response: any) {
  loginOrSignup(response);
}

const loginOrSignup = (response: any) => {
  console.log(response);
  // Vérifier que le facebook user id ne se trouve pas dans la database.
  //      S'il se trouve dans la database, login()
  //      S'il ne se trouve pas dans la database, signup()
};

function componentClicked() {
  console.log('clicked');
}

const facebookLogin = () => {
  return (
    <FacebookLogin
      appId="1017021355164596"
      autoLoad={true}
      fields="first_name,name,last_name,email,gender,birthday,picture"
      onClick={componentClicked}
      callback={responseFacebook}
    />
  );
};

export default facebookLogin;
