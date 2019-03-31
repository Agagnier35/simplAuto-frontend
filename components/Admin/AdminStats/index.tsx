import React from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';

export interface AdminStatsPageProps {
  translations: Translations;
  isStatsMode: boolean;
}

const AdminStats = ({ translations, isStatsMode }: AdminStatsPageProps) => {
  return <>{isStatsMode && null}</>;
};

export default multi(AdminStats);
