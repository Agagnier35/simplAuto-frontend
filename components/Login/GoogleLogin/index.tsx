import * as React from 'react';
import GoogleLogin from "react-google-login";

function responseGoogle(response: any) {
    loginOrSignup(response);
}

const loginOrSignup = (response: any) => { 
    console.log(response);
    // Vérifier que le facebook user id ne se trouve pas dans la database.
    //      S'il se trouve dans la database, login()
    //      S'il ne se trouve pas dans la database, signup()
}

const googleLogin = () => {
    return ( <GoogleLogin
        clientId="336221605230-o9967qlvh1121ublhs76bh9flm6kb3r8.apps.googleusercontent.com"
        buttonText="Login With Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />);
}

export default googleLogin;