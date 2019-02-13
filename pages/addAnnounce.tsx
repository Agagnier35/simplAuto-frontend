import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';
import AnnounceAdd from '../components/AnnounceAdd';

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
      <AnnounceAdd />
    </div>

  );
};

export default multiUpdater(Home);
