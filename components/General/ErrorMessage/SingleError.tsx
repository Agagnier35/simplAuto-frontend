import * as React from 'react';
import Translations from '../../../lib/MultiLang/locales/types';
import StyledError from './styles';
import { multi } from '../../../lib/MultiLang';
import { Card } from 'react-bootstrap';
import { FaBan } from 'react-icons/fa';

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
      <Card>
        <Card.Body>
          <FaBan />
          <p>{errors[errorKey]}</p>
        </Card.Body>
      </Card>
    </StyledError>
  );
};
export default multi(SingleError);
