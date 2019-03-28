import React from 'react';
import PrivateComponent from '../lib/Auth/PrivateComponent';
import Offer from '../components/Offer/Offer';
import redirect from '../lib/Auth/Redirect';
import checkOfferExists from '../lib/PostExists/checkOfferExists';
import { Query } from 'react-apollo';
import { OFFER_BY_ID } from '../components/Offer/Offer/Queries';
import { MESSAGE_SUBSCRIPTION } from '../components/Chat/Chat/Subscriptions';

class OfferPage extends PrivateComponent {
  static async getInitialProps(ctx: any) {
    const { user } = await PrivateComponent.getInitialProps(ctx);

    const offer = await checkOfferExists(ctx.apolloClient, ctx.query.id);

    if (!offer) {
      redirect(ctx, '/login');
    }

    return { user };
  }

  render() {
    return (
      <div>
        <Query query={OFFER_BY_ID} variables={{ id: this.props.query.id }}>
          {params => (
            <Offer
              {...this.props}
              {...params}
              subscribeToNewComments={() =>
                params.subscribeToMore({
                  document: MESSAGE_SUBSCRIPTION,
                  variables: {
                    conversationID:
                      params.data &&
                      params.data.offer &&
                      params.data.offer.conversation &&
                      params.data.offer.conversation.id,
                  },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    console.log(subscriptionData.data);

                    // return Object.assign({}, prev, {
                    //   entry: {
                    //     comments: [newFeedItem, ...prev.entry.comments],
                    //   },
                    // });
                    return { ...prev };
                    console.log(prev);
                  },
                })
              }
            />
          )}
        </Query>
      </div>
    );
  }
}

export default OfferPage;
