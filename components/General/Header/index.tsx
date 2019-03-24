import * as React from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import StyledNav from './styles';
import Router from 'next/router';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import { multi, MultiProps } from '../../../lib/MultiLang';
import { IoMdCar } from 'react-icons/io';
import { Query, Mutation } from 'react-apollo';

export const LOGGED_IN_QUERY = gql`
  {
    me {
      id
      firstName
      lastName
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
  return (
    <StyledNav id="topbar" className="noPrint">
      <Link href="/" passHref>
        <Navbar.Brand>
          <IoMdCar />
          Simplauto
        </Navbar.Brand>
      </Link>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Query query={LOGGED_IN_QUERY}>
            {({ data, loading }) => {
              if (loading) return null;
              if (data && data.me) {
                return (
                  <>
                    <Nav className="mr-auto">
                      <Link href="/carAds" passHref prefetch>
                        <Nav.Item as="a">{general.buy}</Nav.Item>
                      </Link>
                      <Link href="/carAds" passHref prefetch>
                        <Nav.Item as="a">{general.sell}</Nav.Item>
                      </Link>
                      <Link href="/cars" passHref prefetch>
                        <Nav.Item as="a">{general.myCars}</Nav.Item>
                      </Link>
                      <Link href="/myAds" passHref prefetch>
                        <Nav.Item as="a">{general.myAds}</Nav.Item>
                      </Link>
                      <Link href="/profile" passHref>
                        <a className="firstName">{data.me.firstName}</a>
                      </Link>
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
                  <Link href="/premium">
                    <a>
                      <Button variant="primary">{general.becomePremium}</Button>
                    </a>
                  </Link>
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
