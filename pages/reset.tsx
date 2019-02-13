import React from 'react';
import { multi } from '../lib/MultiLang';
import IsNotLoggedIn from '../components/IsNotLoggedIn';
import ResetPw from "../components/resetPw";
import Translations from '../lib/MultiLang/locales/types';


export interface CarPageProps {
  translations: Translations;
  query: {
    id: String;
  };
}

const newPw = ({query}) => {
  return (
    <IsNotLoggedIn>
        <ResetPw query={query.resetToken}></ResetPw>
    </IsNotLoggedIn >
  );
};

export default multi(newPw);
