import styled from 'styled-components';

export const AdSummaries = styled.div`
  & > * + * {
    border-top: 1px solid #aeb2b652;
  }
`;

export const Tab = styled.p`
  cursor: pointer;
  display: inline-block;
  margin: 0;
  background: white;
  width: fit-content;
  color: ${props => props.theme.colors.primary};
  padding: 0 0.5rem;
  border-radius: 0.25rem 0.25rem 0 0;
  margin-left: 1rem;
  transition: 0.15s ease-out;

  & + & {
    margin-left: 0;
  }

  &:hover {
    background: #c7c7ce;
    color: white;

    span {
      color: ${props => props.theme.colors.primary};
      background: white;
    }
  }

  &.active {
    color: white;
    background: ${props => props.theme.colors.primary};

    span {
      color: ${props => props.theme.colors.primary};
      background: white;
    }
  }
`;

export const TabBadge = styled.span`
  color: white;
  background: ${props => props.theme.colors.primary};
  width: fit-content;
  padding: 0 0.4rem;
  margin-left: 0.3rem;
  font-size: 0.9rem;
  border-radius: 100rem;
`;
