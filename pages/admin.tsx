import React from 'react';
import { multi } from '../lib/MultiLang';
import { MultiProps } from '../lib/MultiLang';
import { Tab, Tabs } from 'react-bootstrap';
import Translations from '../lib/MultiLang/locales/types';

export interface AdminProps {
  translations: Translations;
}

const Admin = ({ translations }: AdminProps) => {
  return (
    <Tabs defaultActiveKey="User" id="AdminDashboard">
      <Tab eventKey="User" title="User">
        {' '}
      </Tab>
      <Tab eventKey="Stats" title="Stats">
        {' '}
      </Tab>
      <Tab eventKey="Offer/Ad" title="Offer/Ad">
        {' '}
      </Tab>
    </Tabs>
  );
};

export default multi(Admin);
