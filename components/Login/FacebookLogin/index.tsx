import FacebookLogin from "react-facebook-login";
import * as React from 'react';

function responseFacebook(response: any){
    console.log(response);
}

function componentClicked() {
    console.log("clicked");
}

const facebookLogin = () => {
    return (<div>
        <FacebookLogin
        appId="1017021355164596"
        autoLoad={true}
        fields="first_name,name,last_name,email,gender,birthday,picture"
        onClick={componentClicked}
        callback={responseFacebook} />
        </div>)
}

export default facebookLogin;