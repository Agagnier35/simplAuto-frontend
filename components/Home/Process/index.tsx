import React from 'react';
import { Wrapper } from './styles';
import ProcessPart from '../ProcessPart/index';

const Process = () => {
  return (
    <Wrapper>
      <ProcessPart title="How to buy" steps={['Ask for a car', 'Receive offers', 'Accept the best one']} />
      <ProcessPart title="How to sell" steps={['Add a car', 'Find a matching ad', 'Sell your car']} />
    </Wrapper>
  );
};

export default Process;
