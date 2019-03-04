import React from 'react';
import { Title, Wrapper, Links, Subtitle } from './styles';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { LOGGED_IN_QUERY } from '../../General/Header/index';
import { useQuery } from 'react-apollo-hooks';

interface LandingProps {}

const Landing = (props: LandingProps) => {
  const { data } = useQuery(LOGGED_IN_QUERY);

  return (
    <Wrapper>
      <Title>Let the sellers fight for you</Title>
      <Subtitle>A new way to shop for your car</Subtitle>
      <Links>
        <Link href={{ pathname: '/carAds' }}>
          <a>
            <Button variant="primary">Voir les annonces</Button>
          </a>
        </Link>
        {data && !data.me && (
          <Link href={{ pathname: '/signup' }}>
            <a>
              <Button variant="secondary">Se créer un compte</Button>
            </a>
          </Link>
        )}
      </Links>
    </Wrapper>
  );
};

export default Landing;
