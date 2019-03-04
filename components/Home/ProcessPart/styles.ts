import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const Wrapper = styled(Card)`
  padding: 2rem;
  margin: 0.5rem;
`;

export const Title = styled.h3`
  font-size: 3rem;
`;

export const Steps = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Step = styled.li`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 0.5rem;
  }

  span {
    width: 2rem;
    height: 2rem;
    text-align: center;
    display: block;
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.primary};
    border: 1px solid;
    border-radius: 50px;
    flex-shrink: 0;
  }
`;
