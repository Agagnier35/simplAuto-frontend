import React from 'react';
import { multiUpdater, MultiProps } from '../lib/MultiLang';
import Login from '../components/Login';
import Link from 'next/link';

const Home = ({
  translations: { general, cars },
  changeLocale,
  currentLocale,
}: MultiProps) => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default multiUpdater(Home);
