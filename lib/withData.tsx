import withApollo, { InitApolloOptions } from 'next-with-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { endpoint, prodEndpoint } from '../config';

export function createClient({ headers }: InitApolloOptions<{}>) {
  const cache = new InMemoryCache({});

  const request = async (operation: any) => {
    await operation.setContext({
      headers,
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

  return new ApolloClient({
    cache,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          console.log('TODO: Handle graphQLErrors');
        }
        if (networkError) {
          console.log('TODO: Handle networkError');
        }
      }),
      requestLink,

      new HttpLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        credentials: 'include',
      }),
    ]),
  });
}

export default withApollo(createClient);
