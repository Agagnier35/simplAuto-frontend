import React from 'react';
import { multi } from '../../../lib/MultiLang';
import Translations from '../../../lib/MultiLang/locales/types';

export interface AdminUserPageProps {
  translations: Translations;
  isUserMode: boolean;
}

const AdminUser = ({ translations, isUserMode }: AdminUserPageProps) => {
  return <>{isUserMode && <p>lolUser</p>}</>;
};

export default multi(AdminUser);
