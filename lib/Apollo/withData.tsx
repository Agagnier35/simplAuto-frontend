import withApollo, { InitApolloOptions } from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import {
  ApolloLink,
  Observable,
  split,
  Operation,
  NextLink,
} from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import {
  endpoint,
  prodEndpoint,
  wsEndpoint,
  wsProdEndpoint,
} from '../../config';
import fetch from 'isomorphic-unfetch';
import nookies from 'nookies';

export function createClient({ headers, ctx }: InitApolloOptions<{}>) {
  const cache = new InMemoryCache({});

  console.log('headers1 =');
  console.log(headers);

  const request = async (operation: any) => {
    await operation.setContext((test: any) => {
      return {
        headers,
        fetchOptions: {
          credentials: 'include',
        },
      };
    });
  };

  const requestLink = new ApolloLink(
    (operation: Operation, forward: NextLink | undefined) =>
      new Observable(observer => {
        let handle: ZenObservable.Subscription;
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
    fetchOptions: {
      credentials: 'include',
    },
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri:
          process.env.NODE_ENV === 'development' ? wsEndpoint : wsProdEndpoint,
        options: {
          reconnect: true,
          connectionParams: {
            ...Headers,
            credentials: 'include',
            fetchOptions: {
              credentials: 'include',
            },
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
