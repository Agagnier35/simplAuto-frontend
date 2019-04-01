import styled from 'styled-components';
import { OfferPrice } from '../../Ad/AdSummary/styles';
import { ButtonToolbar, Button } from 'react-bootstrap';

export const Price = styled(OfferPrice)`
  background: white;
  width: fit-content;
  margin: 0;
  margin-right: 1rem;
`;

export const PriceMileageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: -0.5rem -1.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;

  & > * {
    margin: 0.5rem 1.5rem;
  }
`;

export const OfferButtons = styled(ButtonToolbar)`
  margin: -0.5rem;
  margin-top: 0.5rem;

  button {
    width: fit-content;
    flex-grow: 1;
    margin: 0.5rem;
    max-width: 500px;
  }
`;

export const CreateConversation = styled(Button)`
  width: 100%;
  border-radius: 0 0 0.25rem 0.25rem;
`;
