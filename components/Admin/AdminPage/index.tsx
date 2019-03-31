import React, { useState } from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';
import { Tab } from '../../Ad/Ads/styles';
import AdminUser from '../AdminUser';
import AdminStats from '../AdminStats';
import AdminOfferAd from '../AdminOfferAd';

export interface AdminPageProps {
  translations: Translations;
}

enum TabState {
  'USER',
  'STATS',
  'OFFER_AD',
}

const AdminPage = ({ translations }: AdminPageProps) => {
  const [pageMode, setPageMode] = useState(TabState.USER);

  return (
    <>
      <Tab
        onClick={() => setPageMode(TabState.USER)}
        className={pageMode === TabState.USER ? 'active' : ''}
      >
        {translations.admin.tabUser}
      </Tab>
      <Tab
        onClick={() => setPageMode(TabState.STATS)}
        className={pageMode === TabState.STATS ? 'active' : ''}
      >
        {translations.admin.tabStats}
      </Tab>
      <Tab
        onClick={() => setPageMode(TabState.OFFER_AD)}
        className={pageMode === TabState.OFFER_AD ? 'active' : ''}
      >
        {translations.admin.tabOfferAd}
      </Tab>
      <AdminUser isUserMode={pageMode === TabState.USER} />
      <AdminStats isStatsMode={pageMode === TabState.USER} />
      <AdminOfferAd isOfferAdMode={pageMode === TabState.USER} />
    </>
  );
};

export default multi(AdminPage);
