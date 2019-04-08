import React from 'react';
import checkLoggedIn from './CheckedLoggedIn';
import redirect from './Redirect';

// Overwrites the getInitialProps Lifecycle hook
// To check for token and redirect if you're logged in

/* Example usage:
  *
    class LoginPage extends PublicComponent

    Login Page is now only accessible for not logged in users
  *
*/
export default class PublicComponent<
  Props = {},
  State = {}
> extends React.Component<Props, State> {
  static async getInitialProps(ctx: any) {
    const { user }: any = await checkLoggedIn(ctx.apolloClient);
    console.log(user);

    if (user && user.me) {
      // Already Logged in
      redirect(ctx, '/'); // -> Home
    }

    return {};
  }
}
