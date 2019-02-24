import React from 'react';
import { multi } from '../lib/MultiLang';
import AdDetail from '../components/AdDetail';
import Translations from '../lib/MultiLang/locales/types';

export interface AdDetailProps {
  translations: Translations;
  query: { id: string };
}

const FullAd = ({ translations, query }: AdDetailProps) => {
  return <AdDetail adID={query.id} />;
};
export default multi(FullAd);
