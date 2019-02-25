import React from 'react';
import { multi, MultiProps } from '../../../lib/MultiLang';
import StyledLoading from './styles';

const loading = ({ translations }: MultiProps) => {
  return (
    <StyledLoading>
      <p>{translations.loading}</p>
    </StyledLoading>
  );
};

export default multi(loading);
