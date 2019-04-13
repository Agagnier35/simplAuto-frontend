import styled from 'styled-components';
import { Offer } from '../../../generated/graphql';

export const ConversationsStyle = styled.div`
  border-bottom: 1px solid #ced4da;
  border-left: 1px solid #ced4da;
  border-right: 1px solid #ced4da;
  height: fit-content;
  flex-grow: 1;

  &:nth-child(1) {
    border-top: 1px solid #ced4da;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  &:nth-last-child(1) {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  .isSelected {
    background-color: #f2f5fc;
  }

  &:hover {
    background: #e3e5ea;
  }
`;

export const Container = styled('div')<{ currentOffer: Offer | null }>`
  height: calc(100vh - 4rem - 132px);
  overflow: scroll;
  flex-grow: 1;
  margin-right: -4px;

  @media (max-width: 900px) {
    display: ${props => (props.currentOffer ? 'none' : 'flex')};
  }
`;
