import React from 'react';
import App, { Container, AppComponentContext } from 'next/app';
import { NextComponentType, NextContext } from 'next';
import { ApolloProvider } from 'react-apollo';

import Page from '../components/Page';
import withData from '../lib/withData';
import { ApolloClient } from 'apollo-boost';
import MultiLang from '../lib/MultiLang';

import 'bootstrap/dist/css/bootstrap.css';

interface PageProps {
  query?: any;
}

interface Props {
  Component: NextComponentType;
  pageProps: PageProps;
  apollo: ApolloClient<{}>;
  ctx: NextContext;
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppComponentContext) {
    let pageProps: PageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // Exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <MultiLang initialLocale="fr">
            <Page>
              <Component {...pageProps} />
            </Page>
          </MultiLang>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
