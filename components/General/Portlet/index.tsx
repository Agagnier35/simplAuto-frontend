import React, { ReactNode, useState } from 'react';
import { Container, Title, Arrow, Arrows, Header, Body } from './styles';
import Carousel from 'react-bootstrap/Carousel';
import {
  TiChevronRight as ArrowRightIcon,
  TiChevronLeft as ArrowLeftIcon,
} from 'react-icons/ti';

export interface PortletProps {
  title: string;
  pages: ReactNode[];
  image?: ReactNode;
  interval: number;
}

const Portlet = ({ pages, title, image, interval }: PortletProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  function handleIndex(index: number) {
    const max = pages.length - 1;
    if (index > max) {
      setCarouselIndex(0);
    } else if (index < 0) {
      setCarouselIndex(max);
    } else {
      setCarouselIndex(index);
    }
  }

  return (
    <Container>
      {image}
      <Body>
        <Header>
          <Title>{title}</Title>
          <Arrows>
            <Arrow onClick={() => handleIndex(carouselIndex - 1)}>
              <ArrowLeftIcon />
            </Arrow>
            <Arrow onClick={() => handleIndex(carouselIndex + 1)}>
              <ArrowRightIcon />
            </Arrow>
          </Arrows>
        </Header>
        <Carousel
          activeIndex={carouselIndex}
          controls={false}
          indicators={false}
          interval={interval}
          onSelect={() => {}} // fixes bootstrap console error
        >
          {pages.map((Component: ReactNode, index: number) => (
            <Carousel.Item key={index}>{Component}</Carousel.Item>
          ))}
        </Carousel>
      </Body>
    </Container>
  );
};

export default Portlet;
