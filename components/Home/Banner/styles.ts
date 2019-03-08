import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-left: 2rem;
    font-size: 110px;
    color: ${props => props.theme.colors.primary};
  }
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.dark};
  font-size: 3.75rem;
  margin-bottom: 0.5rem;

  @media (max-width: 450px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  text-transform: uppercase;
`;
