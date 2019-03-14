import React from 'react';
import { Wrapper } from './styles';
import ProcessPart from '../ProcessPart/index';
import { multi, MultiProps } from '../../../lib/MultiLang';

interface ProcessProps extends MultiProps {}

const Process = ({ translations }: ProcessProps) => {
  return (
    <Wrapper>
      <ProcessPart
        title={translations.Home.HowToBuy}
        steps={[
          translations.Home.HowToBuyFirst,
          translations.Home.HowToBuySecond,
          translations.Home.HowToBuyThird,
        ]}
      />
      <ProcessPart
        title={translations.Home.HowToSell}
        steps={[
          translations.Home.HowToSellFirst,
          translations.Home.HowToSellSecond,
          translations.Home.HowToSellThird,
        ]}
      />
    </Wrapper>
  );
};

export default multi(Process);
