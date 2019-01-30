import * as React from 'react';
import Translations from '../../lib/MultiLang/locales/types';
import StyledError from './styles';
import { multi } from '../../lib/MultiLang';

interface ErrorDictionary {
  [index: string]: string;
}

export interface SingleErrorProps {
  error: any;
  translations: Translations;
}

const SingleError = ({ error, translations }: SingleErrorProps) => {
  const errorKey: string = error.message.replace('GraphQL error: ', '');
  const errors = translations.errors as ErrorDictionary;
  return (
    <StyledError>
      <p>{errors[errorKey]}</p>
    </StyledError>
  );
};
export default multi(SingleError);
