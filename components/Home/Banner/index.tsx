import React, { ReactNode } from 'react';
import { Title, Wrapper, Subtitle } from './styles';

interface BannerProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
}

const Banner = ({ title, subtitle, icon }: BannerProps) => {
  return (
    <Wrapper>
      <div>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </div>
      {icon}
    </Wrapper>
  );
};

export default Banner;
