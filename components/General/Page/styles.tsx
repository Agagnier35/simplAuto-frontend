import styled from 'styled-components';

export const StyledPage = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.secondary};
  position: relative;
  display: flex;
  flex-flow: column;
`;

export const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  flex-grow: 1;
  width: 100%;
  padding: 2rem;
  padding-top: calc(2rem + 72px);
`;
