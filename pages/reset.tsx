import React, { Component } from 'react';
import ResetPassword from '../components/resetPw';
import Translations from '../lib/MultiLang/locales/types';
import PublicComponent from '../lib/Auth/PublicComponent';

export interface CarPageProps {
  translations: Translations;
  query: {
    resetToken: string;
  };
}

class ResetPage extends PublicComponent<CarPageProps> {
  render() {
    const { query } = this.props;

    return (
      <div>
        <ResetPassword resetToken={query.resetToken} />
      </div>
    );
  }
}

export default ResetPage;
