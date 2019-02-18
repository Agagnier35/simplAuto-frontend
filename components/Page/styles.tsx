import styled from 'styled-components';

export const StyledPage = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.secondary};
`;

export const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;
