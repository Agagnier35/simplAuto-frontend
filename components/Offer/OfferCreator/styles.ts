import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.25rem;
`;

export const Name = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  text-transform: uppercase;
  font-weight: bold;
`;
