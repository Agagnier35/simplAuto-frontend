import React from 'react';
import { GiCarKey as KeyIcon } from 'react-icons/gi';
import Landing from '../Landing/index';
import Banner from '../Banner/index';
import { StyledHome } from './styles';
import Process from '../Process/index';
import { multi, MultiProps } from '../../../lib/MultiLang';

interface HomeProps extends MultiProps {}

const Home = ({ translations }: HomeProps) => {
  return (
    <StyledHome>
      <Landing />
      <Banner
        title={translations.Home.BannerTitle}
        subtitle={translations.Home.BannerSubtitle}
        icon={<KeyIcon />}
      />
      <Process />
    </StyledHome>
  );
};

export default multi(Home);
