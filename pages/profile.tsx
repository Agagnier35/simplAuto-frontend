import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';
import Login from '../components/Login';
import ProfileAccess from '../components/ProfileIcon'

const Home = ({
  translations: { general },
  changeLocale,
  currentLocale,
}: MultiProps) => {
  return (
    <div>
      <div>
        <button
          onClick={() => changeLocale(currentLocale === 'en' ? 'fr' : 'en')}>
          {general.changeLangage}
        </button>
      </div>
      
      <Login />
    </div>
  );
};

export default multiUpdater(Home);
