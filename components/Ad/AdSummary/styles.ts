import styled from 'styled-components';
import { Col, Dropdown, Row } from 'react-bootstrap';
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

export const AdOfferItem = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 1rem;
  }

  .image-wrapper {
    position: relative;
  }

  .info-wrapper {
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    object-position: center;
    border-radius: 100px;
  }

  p {
    margin: 0;
  }

  .price {
    background: ${props => props.theme.colors.secondary};
    padding: 0 0.5rem;
    border-radius: 0.25rem;
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
    font-size: 1.25rem;
  }
`;

export const Badge = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${props => props.theme.colors.primary};
  color: white;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

export const ButtonRow = styled(Row)`
  justify-content: flex-end;
`;

export const FirstPlace = styled(Badge)`
  background: #ffe000;
  color: #d4910d;
  box-shadow: inset -2px -1px 10px #dc700061;
  border: 2px solid #ffdf00;
`;

export const SecondPlace = styled(Badge)`
  background: #cccbc7;
  color: white;
  box-shadow: inset -2px -1px 10px #04030161;
  border: 2px solid #cccbc7;
`;

export const ThirdPlace = styled(Badge)`
  background: #d4910d;
  color: black;
  box-shadow: inset -2px -1px 10px #a23d0275;
  border: 2px solid #e2ac41;
`;
