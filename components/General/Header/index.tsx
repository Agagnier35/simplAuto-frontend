import * as React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import StyledNav from './styles';
import Router from 'next/router';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { IoMdCar } from 'react-icons/io';
import { Query, Mutation } from 'react-apollo';
import Notifications from '../Notifications';
import { appName } from '../Preferences';
import { ClientType, Permission } from '../../../generated/graphql';

export const LOGGED_IN_QUERY = gql`
  query LOGGED_IN_QUERY {
    me {
      id
      firstName
      lastName
      permissions
      companyName
      clientType
      email
      permissions
      notifications {
        id
        type
        objectID
        updatedAt
        count
      }
    }
  }
`;
const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

NProgress.configure({ showSpinner: false, parent: '#topbar' });

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const handleLogout = async (logout: () => void) => {
  await logout();
  Router.push('/');
};

const Header: React.SFC<MultiProps> = ({
  translations: { general, login, signup },
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <StyledNav id="topbar" className="noPrint">
      <Link href="/" passHref>
        <Navbar.Brand>
          <IoMdCar />
          {appName}
        </Navbar.Brand>
      </Link>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setIsOpen(false)}
        />
        <Navbar.Collapse>
          <Query
            query={LOGGED_IN_QUERY}
            pollInterval={10000}
            fetchPolicy="network-only"
          >
            {({ data, loading }) => {
              if (loading) return null;
              if (data && data.me) {
                return (
                  <>
                    <Nav className="mr-auto">
                      <Link href="/myAds" passHref prefetch>
                        <Nav.Item as="a">{general.buy}</Nav.Item>
                      </Link>
                      <Link href="/cars" passHref prefetch>
                        <Nav.Item as="a">{general.sell}</Nav.Item>
                      </Link>
                      {data.me.permissions.includes(Permission.Admin) ? (
                        <Link href="/admin" passHref prefetch>
                          <Nav.Item as="a">Admin</Nav.Item>
                        </Link>
                      ) : (
                        !data.me.permissions.includes(Permission.Premium) && (
                          <Link href="/premium" passHref prefetch>
                            <Nav.Item as="a">Premium</Nav.Item>
                          </Link>
                        )
                      )}
                      <Link href="/conversations" passHref prefetch>
                        <Nav.Item as="a">{general.myConversations}</Nav.Item>
                      </Link>
                      <Link href="/profile" passHref>
                        <a className="firstName">
                          {data.me.clientType === ClientType.Individual
                            ? data.me.firstName.charAt(0)
                            : data.me.companyName.charAt(0)}
                        </a>
                      </Link>
                      <Notifications
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        notifications={data.me.notifications}
                      />
                    </Nav>
                    <Mutation
                      mutation={LOGOUT_MUTATION}
                      refetchQueries={[{ query: LOGGED_IN_QUERY }]}
                    >
                      {handleMutation => (
                        <Button
                          variant="primary"
                          onClick={() => handleLogout(handleMutation)}
                        >
                          {general.disconnect}
                        </Button>
                      )}
                    </Mutation>
                  </>
                );
              }
              return (
                <>
                  <Nav className="mr-auto" />
                  <p className="logged-out">
                    <Link href="/login" passHref prefetch>
                      <a>{login.title}</a>
                    </Link>
                    {` ${general.or} `}
                    <Link href="/signup" passHref prefetch>
                      <a>{signup.title}</a>
                    </Link>
                  </p>
                </>
              );
            }}
          </Query>
        </Navbar.Collapse>
      </Navbar>
    </StyledNav>
  );
};

export default multi(Header);
