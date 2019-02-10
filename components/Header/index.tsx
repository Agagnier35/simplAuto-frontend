import * as React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import StyledNav from './styles';
import Router from 'next/router';
import NProgress from 'nprogress';
import { multiUpdater, MultiProps } from '../../lib/MultiLang';
import { IoMdCar } from 'react-icons/io';

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

          <p className="logged-out">
            <Link href="/login" passHref>
              <a>{translations.login.title}</a>
            </Link>
            <span>{` ${translations.general.or} `}</span>
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
        </Navbar.Collapse>
      </Navbar>
    </StyledNav>
  );
};

export default multiUpdater(Header);
