import styled from 'styled-components';
import { Card, Carousel } from 'react-bootstrap';

export const Container = styled.div`
  min-height: 200px;
  display: flex;
  flex-flow: row !important;

  & > img,
  & > a img {
    width: 200px;
    max-height: 200px;
    height: 100%;
    object-fit: contain;
    object-position: center;
    box-shadow: inset -8px 9px 23px -12px #0000001c;
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
  margin-bottom: 1rem;
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
  cursor: pointer;

  & + & {
    margin-left: 0.5rem;
  }

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

export const Title = styled.div`
  text-transform: uppercase;
  color: ${props => props.theme.colors.secondaryDarker};
  line-height: 1;
  font-weight: 500;
  margin-bottom: 0;
  display: flex;
  align-items: center;

  a {
    color: ${props => props.theme.colors.secondaryDarker};
  }
`;

export const Left = styled.div`
  margin-right: 1rem;
`;

export const Right = styled.div`
  display: block;
  margin-left: 80%;
`;
