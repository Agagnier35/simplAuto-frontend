import React from 'react';
import { multi } from '../lib/MultiLang';
import IsNotLoggedIn from '../components/IsNotLoggedIn';
import Login from '../components/Login';

const login = () => {

  return (
    <IsNotLoggedIn>
        <Login/>
    </IsNotLoggedIn >
  );
};

export default multi(login);