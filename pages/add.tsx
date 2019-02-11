import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';
import CarAdd from '../components/CarAdd';

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
      <CarAdd />
    </div>

  );
};

export default multiUpdater(Home);
