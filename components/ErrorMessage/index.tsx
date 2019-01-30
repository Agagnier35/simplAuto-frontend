import React from 'react';
import StyledError from './styles';

const ErrorMessage = ({ error }: any) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((errorItem: any, i: number) => (
      <StyledError key={i}>
        <p data-test="graphql-error">
          {errorItem.message.replace('GraphQL error: ', '')}
        </p>
      </StyledError>
    ));
  }
  return (
    <StyledError>
      <p data-test="graphql-error">
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </StyledError>
  );
};

export default ErrorMessage;
