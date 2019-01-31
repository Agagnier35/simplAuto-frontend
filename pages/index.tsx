import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';
import Login from '../components/Login';

const Home = ({
  translations: { general },
  changeLocale,
  currentLocale,
}: MultiProps) => {
  return (
    <div>
      <button
        onClick={() => changeLocale(currentLocale === 'en' ? 'fr' : 'en')}
      >
        {general.changeLangage}
      </button>
      <Login />
    </div>
  );
};

export default multiUpdater(Home);
