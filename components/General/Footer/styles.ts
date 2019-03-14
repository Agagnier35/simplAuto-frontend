import styled from 'styled-components';

export const Container = styled.div`
  background: white;
`;

export const Wrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${props => props.theme.maxWidth};
  margin: auto;
  padding: 0 2rem;
`;

export const Copyrights = styled.p`
  margin-bottom: 0;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.secondaryDarker};

  a {
    color: ${props => props.theme.colors.primary};
  }
`;
