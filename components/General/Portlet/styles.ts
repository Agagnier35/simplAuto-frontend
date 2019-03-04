import styled from 'styled-components';
import { Card, Carousel } from 'react-bootstrap';

export const Container = styled(Card)`
  min-height: 200px;
  display: flex;
  flex-flow: row;

  img {
    width: 300px;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 0.25rem 0 0 0.25rem;
  }
`;

export const Body = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const Arrows = styled.div`
  display: flex;
`;

export const Arrow = styled.div`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.primary};
  height: 1.75rem;
  width: 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: 0.25s ease-out;

  & + & {
    margin-left: 0.5rem;
  }

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

export const Title = styled.p`
  text-transform: uppercase;
  color: ${props => props.theme.colors.secondaryDarker};
  line-height: 1;
  font-weight: 500;
  margin-bottom: 0;
`;

export const Wrapper = styled(Carousel)``;

export const Page = styled(Carousel.Item);
