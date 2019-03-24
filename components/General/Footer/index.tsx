import React from 'react';
import { Wrapper, Copyrights, Container } from './styles';
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';
import { multiUpdater, MultiProps } from '../../../lib/MultiLang/index';
import { appName, languageFR, languageEN, copyRightYear } from '../Preferences';

interface FooterProps extends MultiProps {}

const Footer = ({ currentLocale, changeLocale }: FooterProps) => {
  return (
    <Container>
      <Wrapper>
        <Copyrights>
          {copyRightYear} ©{' '}
          <Link href="/">
            <a>{appName}</a>
          </Link>
        </Copyrights>
        <Dropdown>
          <Dropdown.Toggle size="sm" variant="primary" id="dropdown-basic">
            {currentLocale}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeLocale('en')}>
              {languageEN}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLocale('fr')}>
              {languageFR}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Wrapper>
    </Container>
  );
};

export default multiUpdater(Footer);
