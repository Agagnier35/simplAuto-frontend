import React from 'react';
import { multi, MultiProps } from '../lib/MultiLang';
import IsNotLoggedIn from '../components/IsNotLoggedIn';
import IsLoggedIn from '../components/IsLoggedIn';
import Signup from '../components/Signup';



const signup = () => {

  return (
    <IsNotLoggedIn>
        <Signup/>
    </IsNotLoggedIn >
  );
};

export default multi(signup);
