import React from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';

import Meta from '../Meta';
import { StyledPage, Inner } from './styles';
import Header from '../Header';

// Add other properties shared across the app
export const theme = {
  maxWidth: '1200px',
  colors: {
    primary: 'lightgray',
  },
};

export const globalStyles = `
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1rem;
    line-height: 2;
    font-family: Arial, sans-serif;
  }

  button:hover {
    cursor: pointer;
  }
`;

injectGlobal`
  ${globalStyles}
`;

export default class Page extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Header />
          <Meta />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}
