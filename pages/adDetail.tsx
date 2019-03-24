import React from 'react';
import AdDetail from '../components/Ad/AdDetail';
import redirect from '../lib/Auth/Redirect';
import checkAdExists from '../lib/PostExists/checkAdExists';

export interface AdDetailProps {
  query: { id: string };
}

class FullAd extends React.Component<AdDetailProps> {
  static async getInitialProps(ctx: any) {
    const ad = await checkAdExists(ctx.apolloClient, ctx.query.id);

    if (!ad) {
      redirect(ctx, '/login');
    }
    return { ad };
  }
  render() {
    const { query } = this.props;
    return <AdDetail adID={query.id} />;
  }
}

export default FullAd;
