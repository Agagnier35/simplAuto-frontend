import styled from 'styled-components';
import { User } from '../../generated/graphql';
import { Card as BSCard } from 'react-bootstrap';

export const Container = styled.section`
  max-height: 300px;
  height: 300px;
  overflow: scroll;
  padding: 1rem;
`;

export const Message = styled('div')<{ sender: User }>`
  color: black;
  display: flex;
  justify-content: ${props => (props.sender ? 'flex-end' : 'flex-start')};
  margin-bottom: 0.2rem;

  p {
    padding: 0.4rem 0.8rem;
    word-break: break-all;
    line-height: 1.4;
    margin: 0;
    border-radius: ${props =>
      props.sender ? '30px 15px 30px 30px' : '15px 30px 30px 30px'};
    color: ${props => (props.sender ? 'white' : 'black')};
    background: ${props =>
      props.sender ? props.theme.colors.third : props.theme.colors.secondary};
  }
`;

export const Card = styled(BSCard)`
  margin-top: 2rem;

  .form-control {
    border-right: none;
    border-left: none;
    border-bottom: none;
    border-radius: 0 0 0 0.25rem;
  }

  .image-button {
    background: transparent;
    border-left: none;
    border-right: none;
    border-bottom: none;
    color: ${props => props.theme.colors.secondaryDarker};
    font-size: 1.45rem;
    padding-right: 1rem;
    padding-left: 1rem;
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }

  .send-button {
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 0 0 0.25rem 0;
    padding: 0 1.5rem;
    cursor: pointer;

    &:hover {
      background: ${props => props.theme.colors.primaryDarker};
    }
  }

  h2 {
    padding: 1rem;
    border-bottom: 1px solid #ced4da;
    margin: 0;
  }
`;
