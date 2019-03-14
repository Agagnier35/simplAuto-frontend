import styled from 'styled-components';
import { OfferPrice } from '../../Ad/AdSummary/styles';
import { ButtonToolbar } from 'react-bootstrap';

export const Price = styled(OfferPrice)`
  background: white;
  width: fit-content;
  margin: 0;
  margin-right: 1rem;
`;

export const PriceMileageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const OfferButtons = styled(ButtonToolbar)`
  margin: -0.5rem;

  button {
    width: fit-content;
    flex-grow: 1;
    margin: 0.5rem;
    max-width: 500px;

    svg {
      margin-right: 0.4rem;
      margin-top: -2px;
    }
  }
`;