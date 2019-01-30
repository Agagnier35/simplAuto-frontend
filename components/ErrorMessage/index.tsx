import React from 'react';
import { multi } from '../../lib/MultiLang';
import SingleError from './SingleError';

const ErrorMessage = ({ error }: { error: any }) => {
  // Render nothing if no errors
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    // If it's an array
    // => loop and render all of them
    return error.networkError.result.errors.map((errorItem: any, i: number) => {
      <SingleError error={errorItem} key={i} />;
    });
  }

  // If there's only one render it
  return <SingleError error={error} />;
};

export default multi(ErrorMessage);
