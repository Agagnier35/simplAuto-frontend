import React from 'react';
import checkLoggedIn from './CheckedLoggedIn';
import redirect from './Redirect';

// Overwrites the getInitialProps Lifecycle hook
// To check for token and redirect if you're not logged in

/* Example usage:
  *
    class MyCars extends PrivateComponent

    MyCars Page is now only accessible for logged in users
  *
*/
export default class PrivateComponent<
  Props = {},
  State = {}
> extends React.Component<Props, State> {
  static async getInitialProps(ctx: any) {
    const { user }: any = await checkLoggedIn(ctx.apolloClient);
    console.log(user);

    if (!user || !user.me) {
      // Not logged in
      redirect(ctx, '/login'); // -> Login
    }

    return { user };
  }
}
