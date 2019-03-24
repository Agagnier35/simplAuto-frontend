import React from 'react';
import { Title, Wrapper, Links, Subtitle } from './styles';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { LOGGED_IN_QUERY } from '../../General/Header/index';
import { useQuery } from 'react-apollo-hooks';
import { multi, MultiProps } from '../../../lib/MultiLang';

interface LandingProps extends MultiProps {}

const Landing = ({ translations }: LandingProps) => {
  const { data } = useQuery(LOGGED_IN_QUERY);

  return (
    // Link to image if client wants to buy it
    // https://www.istockphoto.com/ie/photo/aerial-view-on-red-car-on-the-road-near-tea-plantation-gm641294046-116218053
    <Wrapper style={{ backgroundImage: 'url("/static/car-bg.jpg")' }}>
      <Title>{translations.Home.LandingTitle}</Title>
      <Subtitle>{translations.Home.LandingSubtitle}</Subtitle>
      <Links>
        <Link href={{ pathname: '/carAds' }}>
          <a>
            <Button variant="primary">
              {translations.Home.LandingAdsButton}
            </Button>
          </a>
        </Link>
        {data && !data.me && (
          <Link href={{ pathname: '/signup' }}>
            <a>
              <Button variant="secondary">
                {translations.Home.LandingSignupButton}
              </Button>
            </a>
          </Link>
        )}
      </Links>
    </Wrapper>
  );
};

export default multi(Landing);
