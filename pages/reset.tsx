import React from 'react';
import { multi } from '../lib/MultiLang';
import IsNotLoggedIn from '../components/IsNotLoggedIn';
import ResetPw from '../components/resetPw';
import Translations from '../lib/MultiLang/locales/types';

export interface CarPageProps {
  translations: Translations;
  query: {
    resetToken: string;
  };
}

const newPw = ({ query }: CarPageProps) => {
  return (
    <IsNotLoggedIn>
      <ResetPw resetToken={query.resetToken} />
    </IsNotLoggedIn>
  );
};

export default multi(newPw);
