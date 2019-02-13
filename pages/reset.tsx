import React from 'react';
import { multi } from '../lib/MultiLang';
import IsNotLoggedIn from '../components/IsNotLoggedIn';
import ResetPw from "../components/resetPw";
import { Query } from 'react-apollo';
import Translations from '../lib/MultiLang/locales/types';

// import IsLoggedIn from '../components/IsLoggedIn';
// import Login from '../components/Login';

export interface CarPageProps {
  translations: Translations;
  query: {
    id: String;
  };
}

const newPw = ({query}) => {
  return (
    <IsNotLoggedIn>
        <ResetPw query={query}></ResetPw>
    </IsNotLoggedIn >
  );
};

export default multi(newPw);
