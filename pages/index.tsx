import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';
import Login from '../components/Login';
import ProfileAccess from '../components/ProfileIcon'
import Link from 'next/link';

const Home = ({
  translations: { general, cars },
  changeLocale,
  currentLocale,
}: MultiProps) => {
  return (
    <div>
      <ProfileAccess />
      <Login />
    </div>
  );
};

export default multiUpdater(Home);
