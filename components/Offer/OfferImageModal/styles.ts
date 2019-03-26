import styled from 'styled-components';
import AdSummaryItem from '../../Ad/AdSummary/AdSummaryItem';

export const Container = styled.div`
  background-color: ${props => props.theme.colors.dark};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999999;

  .carousel {
    height: 100vh;
    display: flex;
    align-items: center;

    img {
      width: 90%;
      margin-left: 5%;
    }
  }
`;
