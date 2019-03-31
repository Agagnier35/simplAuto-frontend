import React, { useState } from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import { Tab } from '../../Ad/Ads/styles';

export interface AdminPageProps {
  translations: Translations;
}

enum TabState {
  'USER',
  'STATS',
  'OFFER_AD',
}

const AdminPage = ({ translations }: AdminPageProps) => {
  const [isOfferMode, setOfferMode] = useState(TabState.USER);

  return (
    <>
      <Tab
        onClick={() => setOfferMode(TabState.USER)}
        className={isOfferMode === TabState.USER ? 'active' : ''}
      >
        {translations.admin.tabUser}
      </Tab>
      <Tab
        onClick={() => setOfferMode(TabState.STATS)}
        className={isOfferMode === TabState.STATS ? 'active' : ''}
      >
        {translations.admin.tabStats}
      </Tab>
      <Tab
        onClick={() => setOfferMode(TabState.OFFER_AD)}
        className={isOfferMode === TabState.OFFER_AD ? 'active' : ''}
      >
        {translations.admin.tabOfferAd}
      </Tab>
    </>
  );
};

export default multi(AdminPage);
