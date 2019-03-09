import React from 'react';
import App, { Container, AppComponentContext } from 'next/app';
import { NextComponentType, NextContext } from 'next';
import { ApolloProvider } from 'react-apollo';
import {
  ApolloProvider as ApolloHooksProvider,
  useQuery,
} from 'react-apollo-hooks';

import Page from '../components/General/Page';
import withData from '../lib/Apollo/withData';
import { ApolloClient } from 'apollo-client';
import MultiLang from '../lib/MultiLang';

import 'bootstrap/dist/css/bootstrap.css';
import gql from 'graphql-tag';
import Loading from '../components/General/Loading';
import ErrorMessage from '../components/General/ErrorMessage';
import { UserLanguage } from '../generated/graphql';

interface PageProps {
  query?: any;
}

interface Props {
  Component: NextComponentType;
  pageProps: PageProps;
  apollo: ApolloClient<{}>;
  ctx: NextContext;
}
export const USER_LANGUAGE = gql`
  {
    me {
      language
    }
  }
`;

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
  getLanguage(language: UserLanguage) {
    let initialeLocale = 'fr';
    if (language === 'ENGLISH') {
      initialeLocale = 'en';
    }
    return initialeLocale;
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    const languageQuery = useQuery(USER_LANGUAGE);
    const errors = languageQuery.error;
    if (languageQuery.loading) return <Loading />;
    if (errors) return <ErrorMessage error={errors} />;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <ApolloHooksProvider client={apollo}>
            <MultiLang
              initialLocale={this.getLanguage(languageQuery.data.me.language)}
            >
              <Page>
                <Component {...pageProps} />
              </Page>
            </MultiLang>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
