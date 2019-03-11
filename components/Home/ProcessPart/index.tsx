import React from 'react';
import { Wrapper, Steps, Step, Title } from './styles';

interface ProcessPartProps {
  title: string;
  steps: string[];
}

const ProcessPart = ({ title, steps }: ProcessPartProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Steps>
        {steps.map((step: string, index: number) => (
          <Step key={step}>
            <span>{index + 1}</span>
            {step}
          </Step>
        ))}
      </Steps>
    </Wrapper>
  );
};

export default ProcessPart;
