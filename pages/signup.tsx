import React from 'react';
import { multi } from '../lib/MultiLang';
import IsNotLoggedIn from '../components/IsNotLoggedIn';
import Signup from '../components/Signup';

const signup = () => {
  return (
    <IsNotLoggedIn>
        <Signup/>
    </IsNotLoggedIn >
  );
};

export default multi(signup);
