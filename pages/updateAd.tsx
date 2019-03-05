import React from 'react';
import { multi } from '../lib/MultiLang';
import UpdateAd from '../components/Ad/UpdateAd';
import Translations from '../lib/MultiLang/locales/types';

export interface AdProps {
  translations: Translations;
  query: {
    adId: string;
  };
}

const UpdateAdPage = ({ query }: AdProps) => {
  return <UpdateAd adId={query.adId} />;
};

export default multi(UpdateAdPage);
