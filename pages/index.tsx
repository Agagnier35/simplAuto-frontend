import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';
import Login from '../components/Login';
import Signup from "../components/Signup";

const Home = ({
  translations: { general, cars },
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
      {/* <Login />
      <Signup/> */}
    </div>
  );
};

export default multiUpdater(Home);
