import React from 'react';
import UpdateAd from '../components/Ad/UpdateAd';
import Translations from '../lib/MultiLang/locales/types';

export interface AdProps {
  translations: Translations;
  query: {
    id: string;
  };
}

const UpdateAdPage = (query: AdProps) => {
  return <UpdateAd adId={query.query.id} />;
};

export default UpdateAdPage;
