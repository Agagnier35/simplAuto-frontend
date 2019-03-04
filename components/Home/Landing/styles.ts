import styled from 'styled-components';

export const Wrapper = styled.div`
  height: calc(100vh - 72px);
  width: 100vw;
  background: lightgray;
  padding: 2rem;
  position: absolute;
  left: 0;
  top: 72px;
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.dark};
  font-size: 3.75rem;
  text-align: center;
  margin-bottom: 0.5rem;

  @media (max-width: 450px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  text-transform: uppercase;
  text-align: center;
`;

export const Links = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: red;
  margin: 0 -0.5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  a {
    margin: 0.5rem;
    display: block;
  }
`;
