import React from 'react';
import UpdateAd from '../components/UpdateAd';
import IsLoggedIn from '../components/IsLoggedIn';
import Translations from '../lib/MultiLang/locales/types';

export interface AdProps {
  translations: Translations;
  query: {
    adId: string;
  };
}

const UpdateAdPage = ({ query }: AdProps) => {
  return (
    <IsLoggedIn>
      <UpdateAd adId={query.adId} />
    </IsLoggedIn>
  );
};

export default UpdateAdPage;
