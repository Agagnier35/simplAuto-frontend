import styled from 'styled-components';

export const AdSummaries = styled.div`
  & > * + * {
    border-top: 1px solid #aeb2b652;
  }
`;

export const Tab = styled.p`
  margin: 0;
  background: ${props => props.theme.colors.primary};
  width: fit-content;
  color: white;
  padding: 0 0.5rem;
  margin-left: 1rem;
  border-radius: 0.25rem 0.25rem 0 0;
`;

export const TabBadge = styled.span`
  color: ${props => props.theme.colors.primary};
  width: fit-content;
  background: white;
  padding: 0 0.4rem;
  margin-left: 0.3rem;
  font-size: 0.9rem;
  border-radius: 100rem;
`;
