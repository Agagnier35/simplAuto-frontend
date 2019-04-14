import React, { ReactNode, useState } from 'react';
import {
  Container,
  Title,
  Arrow,
  Arrows,
  Header,
  Body,
  Left,
  Right,
} from './styles';
import Carousel from 'react-bootstrap/Carousel';
import {
  TiChevronRight as ArrowRightIcon,
  TiChevronLeft as ArrowLeftIcon,
} from 'react-icons/ti';
import Link, { LinkProps } from 'next/link';
import { UrlObject } from 'url';
import { StyledProps } from 'styled-components';

export interface PortletProps {
  title: ReactNode;
  pages: ReactNode[];
  image?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  interval: number;
  className?: string;
  href?: UrlObject;
  style?: StyledProps<any>;
}

const Portlet = ({
  pages,
  title,
  image,
  interval,
  left,
  right,
  className,
  href,
  style,
}: PortletProps) => {
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
    <Container style={style} className={className}>
      {href ? (
        <Link href={href}>
          <a>{image}</a>
        </Link>
      ) : (
        { image }
      )}
      <Body>
        <Header>
          <Title className="portlet-title">
            {left && <Left>{left}</Left>}
            {href ? (
              <Link href={href}>
                <a>{title}</a>
              </Link>
            ) : (
              title
            )}
          </Title>
          {pages.length > 1 && (
            <Arrows>
              <Arrow onClick={() => handleIndex(carouselIndex - 1)}>
                <ArrowLeftIcon />
              </Arrow>
              <Arrow onClick={() => handleIndex(carouselIndex + 1)}>
                <ArrowRightIcon />
              </Arrow>
            </Arrows>
          )}
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
        {right && <Right>{right}</Right>}
      </Body>
    </Container>
  );
};

export default Portlet;
