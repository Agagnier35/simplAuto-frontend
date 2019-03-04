import React from 'react';
import { Wrapper, Copyrights, Container } from './styles';
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';
import { multiUpdater, MultiProps } from '../../../lib/MultiLang/index';

interface FooterProps extends MultiProps {}

const Footer = ({ currentLocale, changeLocale }: FooterProps) => {
  return (
    <Container>
      <Wrapper>
        <Copyrights>
          2018 ©{' '}
          <Link href="/">
            <a>SimplAuto</a>
          </Link>
        </Copyrights>
        <Dropdown>
          <Dropdown.Toggle size="sm" variant="primary" id="dropdown-basic">
            {currentLocale}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeLocale('en')}>En</Dropdown.Item>
            <Dropdown.Item onClick={() => changeLocale('fr')}>Fr</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Wrapper>
    </Container>
  );
};

export default multiUpdater(Footer);
