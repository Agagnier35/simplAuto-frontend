import React from 'react';
import { multi } from '../lib/MultiLang';
import IsNotLoggedIn from '../components/IsNotLoggedIn';
import ResetPw from "../components/resetPw";

// import IsLoggedIn from '../components/IsLoggedIn';
// import Login from '../components/Login';


const newPw = () => {
  return (
    <IsNotLoggedIn>
        <ResetPw></ResetPw>
        <h2>Si votre email est valide, un email de confirmation vous sera envoyé.</h2>
    </IsNotLoggedIn >
  );
};

export default multi(newPw);
