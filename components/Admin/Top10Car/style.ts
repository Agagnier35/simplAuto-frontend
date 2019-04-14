import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

export const MakeModel = styled.div`
  font-size: 1.5rem;
  margin-bottom: -0.5rem;
`;

export const Top10Stats = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.secondaryDarker};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Stat = styled.div`
  padding-right: 1rem;
  font-size: 1rem;
  color: ${props => props.theme.colors.secondaryDarker};
`;

export const ListContainer = styled.div`
  padding-bottom: 0.5rem;
`;
