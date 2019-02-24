import React from 'react';
import { multi } from '../lib/MultiLang';
import AdDetail from '../components/AdDetail';
import Translations from '../lib/MultiLang/locales/types';

export interface AdDetailProps {
  translations: Translations;
  id: string;
}

const FullAd = ({ translations, id }: AdDetailProps) => {
  return <AdDetail id={id} />;
};
export default multi(FullAd);
