import React from 'react';
import { GiCarKey as KeyIcon } from 'react-icons/gi';
import Landing from '../Landing/index';
import Banner from '../Banner/index';
import { StyledHome } from './styles';
import Process from '../Process/index';

interface HomeProps {}

const Home = (props: HomeProps) => {
  return (
    <StyledHome>
      <Landing />
      <Banner
        title="So easy"
        subtitle="Buy or sell your car today!"
        icon={<KeyIcon />}
      />
      <Process />
    </StyledHome>
  );
};

export default Home;
