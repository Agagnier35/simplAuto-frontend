import styled from 'styled-components';

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

export const Close = styled.button`
  position: absolute;
  z-index: 999999999999999;
  background: none;
  border: none;
  font-size: 2rem;
  display: flex;
  color: #ffffffab;
  padding: 1rem;

  &:hover {
    color: white;
  }
`;
