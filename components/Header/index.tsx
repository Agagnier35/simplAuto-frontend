import * as React from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';
import Link from 'next/link';
import StyledNav from './styles';
import { multiUpdater, MultiProps } from '../../lib/MultiLang';

const Header: React.SFC<MultiProps> = ({ translations }) => {
  return (
    <StyledNav>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Link href="/" passHref>
          <Navbar.Brand>Simplauto</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">{/* TODO Add routes when logged in */}</Nav>

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
        </Navbar.Collapse>
      </Navbar>
    </StyledNav>
  );
};

export default multiUpdater(Header);
