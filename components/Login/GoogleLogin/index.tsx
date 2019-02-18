import * as React from 'react';
import GoogleLogin from "react-google-login";

function responseGoogle() {
    console.log("Here.");
}


const googleLogin = () => {
    return ( <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />);
}

export default googleLogin;