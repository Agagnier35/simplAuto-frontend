import withApollo, { InitApolloOptions } from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
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

export function createClient({ headers }: InitApolloOptions<{}>) {
  const cache = new InMemoryCache({});

  console.log('Headers:');
  console.log(headers);
  const request = async (operation: any) => {
    await operation.setContext({
      headers: { cookie: headers && headers.cookie },
      fetchOptions: {
        credentials: 'include',
      },
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

  const httpLink = new HttpLink({
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
