import React from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';

import Meta from '../Meta';
import { StyledPage, Inner } from './styles';
import Header from '../Header';
import { globalStyles, theme } from '../Bootstrap/Theme';
import Footer from '../Footer';

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
          <Footer />
        </StyledPage>
      </ThemeProvider>
    );
  }
}
