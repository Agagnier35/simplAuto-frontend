import styled from 'styled-components';
import { Col, Dropdown } from 'react-bootstrap';
import Portlet from '../../General/Portlet';
import AdSummaryItem from './AdSummaryItem';

export const AdPortlet = styled(Portlet)`
  .portlet-title a {
    color: ${props => props.theme.colors.secondaryDarker};
  }
`;

export const ColorCol = styled(Col)`
  margin: auto;
  text-align: center;
  position: relative;

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
  }

  .car-icon {
    width: 100px;
    height: 100px;
    background: ${props => props.theme.colors.secondary};
    stroke: ${props => props.theme.colors.secondaryDarker};
    border-radius: 50%;
    padding: 1rem;
    stroke-width: 6px;

    path {
      opacity: 0.8;
    }
  }

  & > .row {
    justify-content: center;
  }
`;

export const More = styled(Dropdown.Toggle)`
  font-size: 1.75rem;
  padding: 0;
  display: flex;

  &::after {
    display: none;
  }
`;

export const StyledAdSummaryItem = styled.div`
  svg {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    color: ${props => props.theme.colors.primary};
  }
`;

export const AdFeatureItem = styled(AdSummaryItem)`
  width: 33%;
  min-width: 270px;
  flex-grow: 1;
`;
