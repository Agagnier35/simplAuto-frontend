import * as React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import StyledNav from './styles';
import Router from 'next/router';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import { multiUpdater, MultiProps } from '../../lib/MultiLang';
import { IoMdCar } from 'react-icons/io';
import { Query, Mutation } from 'react-apollo';

const LOGGED_IN_QUERY = gql`
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

const Header: React.SFC<MultiProps> = ({ translations }) => {
  return (
    <StyledNav id="topbar">
      <Link href="/" passHref>
        <Navbar.Brand>
          <IoMdCar />
          Simplauto
        </Navbar.Brand>
      </Link>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">{/* TODO Add routes when logged in */}</Nav>
          <Query query={LOGGED_IN_QUERY}>
            {({ data, loading }) => {
              if (loading) return 'allo';
              if (data && data.me) {
                return (
                  <div>
                    <h3>{data.me.firstName}</h3>
                    <Mutation
                      mutation={LOGOUT_MUTATION}
                      refetchQueries={[{ query: LOGGED_IN_QUERY }]}
                    >
                      {handleMutation => (
                        <button onClick={() => handleLogout(handleMutation)}>
                          Se déconnecter
                        </button>
                      )}
                    </Mutation>
                  </div>
                );
              }
              return (
                <>
                  <p className="logged-out">
                    <Link href="/login" passHref>
                      <a>{translations.login.title}</a>
                    </Link>
                    {` ${translations.general.or} `}
                    <Link href="/signup" passHref>
                      <a>{translations.signup.title}</a>
                    </Link>
                  </p>
                  <Link href="/premium">
                    <a>
                      <Button variant="primary">
                        {translations.general.becomePremium}
                      </Button>
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

export default multiUpdater(Header);
