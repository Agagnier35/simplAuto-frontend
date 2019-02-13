import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';
import AddAd from '../components/AddAd';

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
      <AddAd />
    </div>

  );
};

export default multiUpdater(Home);
