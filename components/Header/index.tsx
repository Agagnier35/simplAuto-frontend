import * as React from 'react';
import {
  Navbar,
  Nav,
  Button
} from 'react-bootstrap';
import Link from 'next/link';
import StyledNav from './styles';
import gql from 'graphql-tag';
import { multiUpdater, MultiProps } from '../../lib/MultiLang';
import IsLoggedIn from '../IsLoggedIn';
import IsNotLoggedIn from '../IsNotLoggedIn';
import { Query, Mutation } from 'react-apollo';
import Loading from '../Loading';
import Router from 'next/router';


const  handleLogout = async (logout: () => void) => {
  await logout();
  Router.push('/');
}

const Header: React.SFC<MultiProps> = ({ translations }) => {
  const LOGGED_IN_QUERY = gql`
                  {me
                    {
                      id, 
                      firstName, 
                      lastName
                    }
                  }
                            `;
  const LOGOUT_MUTATION = gql`
                  mutation {
                    logout
                  }
                            `;

  return (
    <StyledNav>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Link href="/" passHref>
          <Navbar.Brand>Simplauto</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">{/* TODO Add routes when logged in */}</Nav>
          <IsLoggedIn>
            <Query query={LOGGED_IN_QUERY}>
              {({ data, loading }) => {
                if (loading) {
                  return (<Loading/>); 
                }
                
                return (
                  <div>
                    <h3>Bonjour {data.me.firstName} {data.me.lastName} </h3>
                    <Mutation mutation={LOGOUT_MUTATION}>
                    {(handleMutation) => (
                      <button onClick={() =>  handleLogout(handleMutation)}
                      >Se déconnecter</button>
                    )}
                     
                    </Mutation>
                  </div>
                );
              }}
            </Query>
          </IsLoggedIn>
          <IsNotLoggedIn>
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
          </IsNotLoggedIn>
        </Navbar.Collapse>
      </Navbar>
    </StyledNav>
  );
};  

export default multiUpdater(Header);
