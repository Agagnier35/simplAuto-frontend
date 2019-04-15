import styled from 'styled-components';

export const CarSummaries = styled.div`
  & > * + * {
    border-top: 1px solid #aeb2b652;
  }
`;

export const TabSubtitle = styled.p`
  padding: 1.5rem;
  margin: 0;
  font-size: 1.25rem;
  text-align: center;
  border-radius: 0.25rem 0.25rem 0 0;
  background: white;
  margin-bottom: -3px;
`;
