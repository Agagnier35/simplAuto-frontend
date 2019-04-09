import withApollo, { InitApolloOptions } from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import {
  endpoint,
  prodEndpoint,
  wsEndpoint,
  wsProdEndpoint,
} from '../../config';
import fetch from 'isomorphic-unfetch';

export function createClient({ headers, ctx }: InitApolloOptions<{}>) {
  const cache = new InMemoryCache({});

  // Polyfill fetch() on the server (used by apollo-client)
  if (!process.browser) {
    global.fetch = fetch;
  }

  const request = async (operation: any) => {
    const signedHeaders = {
      ...headers,
      cookie: ctx && ctx.req ? ctx.req.headers.cookie || '' : document.cookie,
    };
    console.log('HEADERS------');
    console.log(signedHeaders);
    await operation.setContext({
      headers: signedHeaders,
      credentials: 'include',
      uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    });
  };

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle: any;
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            if (forward) {
              handle = forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
            }
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      }),
  );

  const httpLink = createHttpLink({
    headers,
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    credentials: 'include',
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri:
          process.env.NODE_ENV === 'development' ? wsEndpoint : wsProdEndpoint,
        options: {
          reconnect: true,
          connectionParams: {
            ...headers,
            credentials: 'include',
          },
        },
      })
    : null;

  const link = wsLink
    ? split(
        // split based on operation type
        // query + mutation over HTTP
        // subscriptions over websocket transport
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink,
      )
    : httpLink;

  return new ApolloClient({
    cache,
    ssrMode: !process.browser,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.log(graphQLErrors);
        }
        if (networkError) {
          console.log(networkError);
        }
      }),
      requestLink,
      link,
    ]),
  });
}

export default withApollo(createClient);
