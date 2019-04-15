import styled from 'styled-components';
import { Card as BSCard } from 'react-bootstrap';
import { Offer } from '../../../generated/graphql';

export const Container = styled.section`
  overflow: scroll;
  padding: 1rem;
  background: white;
  flex-grow: 1;

  .input-group {
    input {
      height: 50px;
    }
  }
`;

export const MessageStyle = styled('div')<{
  isSelfOrSeller: boolean | null | undefined;
}>`
  color: black;
  display: flex;
  justify-content: ${props =>
    props.isSelfOrSeller ? 'flex-end' : 'flex-start'};
  margin-bottom: 0.2rem;

  p {
    padding: 0.4rem 0.8rem;
    word-break: break-all;
    line-height: 1.4;
    margin: 0;
    border-radius: ${props =>
      props.isSelfOrSeller ? '30px 15px 30px 30px' : '15px 30px 30px 30px'};
    color: ${props => (props.isSelfOrSeller ? 'white' : 'black')};
    background: ${props =>
      props.isSelfOrSeller
        ? props.theme.colors.third
        : props.theme.colors.secondary};
  }
`;

export const Time = styled.span`
  color: #cac7c7;
  font-size: 0.75rem;
  white-space: nowrap;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;

  * + & {
    margin-left: 0.5rem;
    margin-right: 0;
  }
`;

export const DaySpacer = styled.div`
  display: flex;
  align-items: center;

  hr {
    flex-grow: 1;
  }

  span {
    color: ${props => props.theme.colors.primary};
    padding: 0 0.5rem;
    font-size: 0.75rem;
  }
`;

export const Card = styled(BSCard)<{ currentOffer: Offer | null }>`
  height: calc(100vh - 4rem - 132px);
  flex-grow: 1000;

  @media (max-width: 900px) {
    display: ${props => (props.currentOffer ? 'flex' : 'none')};
  }

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

  .imagePreview {
    max-width: 50px;
    height: 50px;
  }

  .chatImage {
    max-width: 300px;
    height: 200px;
    margin-bottom: 1rem;
    object-fit: contain;
    border: 1px solid #e5e5e5;
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
    margin: 0;
  }

  .input-group {
    input {
      height: 50px;
    }
  }
`;

export const ChatTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ced4da;

  button {
    margin-right: 1rem;

    @media (min-width: 901px) {
      display: none;
    }
  }
`;
