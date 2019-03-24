import React from 'react';
import App, { Container, AppComponentContext } from 'next/app';
import { NextComponentType, NextContext } from 'next';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import Page from '../components/General/Page';
import withData from '../lib/Apollo/withData';
import { ApolloClient } from 'apollo-client';
import MultiLang from '../lib/MultiLang';
import 'bootstrap/dist/css/bootstrap.css';
import gql from 'graphql-tag';
import { User, UserLanguage } from '../generated/graphql';

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
  getLanguage(me: User) {
    let initialeLocale = 'fr';
    if (me && me.language === UserLanguage.English) {
      initialeLocale = 'en';
    }
    return initialeLocale;
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <ApolloHooksProvider client={apollo}>
            <Query query={USER_LANGUAGE}>
              {({ data, loading }) => {
                if (loading) return null;
                return (
                  <MultiLang initialLocale={this.getLanguage(data.me)}>
                    <Page>
                      <Component {...pageProps} />
                    </Page>
                  </MultiLang>
                );
              }}
            </Query>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
