import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';

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
    </div>
  );
};

export default multiUpdater(Home);
