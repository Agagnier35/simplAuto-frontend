import React from 'react';
import PrivateComponent from '../lib/Auth/PrivateComponent';
import Offer from '../components/Offer/Offer';
import redirect from '../lib/Auth/Redirect';
import checkOfferExists from '../lib/PostExists/checkOfferExists';

class OfferPage extends PrivateComponent {
  static async getInitialProps(ctx: any) {
    const { user } = await PrivateComponent.getInitialProps(ctx);

    const offer = await checkOfferExists(ctx.apolloClient, ctx.query.id);

    console.log(offer);
    if (!offer) {
      redirect(ctx, '/login');
    }

    return { user };
  }

  render() {
    return (
      <div>
        <Offer {...this.props} />
      </div>
    );
  }
}

export default OfferPage;
