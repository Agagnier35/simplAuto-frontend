import React, { useState } from 'react';
import SearchUser from '../SearchUser';
import { Tab } from '../../Ad/Ads/styles';
import Translations from '../../../lib/MultiLang/locales/types';
import { multi } from '../../../lib/MultiLang';
import { Card } from 'react-bootstrap';
import Stats from '../Stats';
import ApolloClient from 'apollo-client';

export interface AdminPageProps {
  translations: Translations;
  client: ApolloClient<any>;
}

const Admin = ({ translations, client }: AdminPageProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Tab
        className={tabIndex === 0 ? 'active' : ''}
        onClick={() => setTabIndex(0)}
      >
        {translations.admin.users}
      </Tab>
      <Tab
        className={tabIndex === 1 ? 'active' : ''}
        onClick={() => setTabIndex(1)}
      >
        {translations.admin.stats}
      </Tab>
      <Card hidden={tabIndex !== 0}>
        <SearchUser />
      </Card>
      <Card hidden={tabIndex !== 1}>
        <Stats client={client} />
      </Card>
    </>
  );
};

export default multi(Admin);
