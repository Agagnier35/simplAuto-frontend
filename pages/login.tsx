import React from 'react';
import { multi } from '../lib/MultiLang';
import IsNotLoggedIn from '../components/IsNotLoggedIn';
// import IsLoggedIn from '../components/IsLoggedIn';
import Login from '../components/Login';
import Link from "next/link";



const login = () => {

  return (
    <IsNotLoggedIn>
        <Login/>
        <Link href="/resetPw" passHref>
          <a>Reset Password</a>
        </Link>
    </IsNotLoggedIn >
  );
};

export default multi(login);
