import React from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';

export interface AdminOfferAdPageProps {
  translations: Translations;
  isOfferAdMode: boolean;
}

const AdminOfferAd = ({
  translations,
  isOfferAdMode,
}: AdminOfferAdPageProps) => {
  return <>{isOfferAdMode && null}</>;
};

export default multi(AdminOfferAd);
