import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';

const Home = ({ translations, changeLocale, currentLocale }: MultiProps) => {
  return (
    <div>
      {translations.hello}
      <button
        onClick={() => changeLocale(currentLocale === 'en' ? 'fr' : 'en')}
      >
        Click me
      </button>
    </div>
  );
};

export default multiUpdater(Home);
