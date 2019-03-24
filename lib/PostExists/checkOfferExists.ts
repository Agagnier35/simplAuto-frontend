import { ApolloClient } from 'apollo-client';
import { OFFER_BY_ID } from '../../components/Offer/Offer/Queries';
import { Offer } from '../../generated/graphql';

export default (apolloClient: ApolloClient<any>, id: string) =>
  apolloClient
    .query({
      query: OFFER_BY_ID,
      variables: { id },
    })
    .then(({ data }) => {
      return data.offer;
    })
    .catch(() => {
      return null;
    });
