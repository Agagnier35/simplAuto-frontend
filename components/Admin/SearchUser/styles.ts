import styled from 'styled-components';
import { Row, Button } from 'react-bootstrap';

export const Container = styled.div``;

export const UserSummaries = styled.div`
  background: white;
  border-radius: 0.25rem;
  padding-bottom: 1rem;
`;

export const Header = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin: -0.5rem;
  padding: 1.5rem;
  justify-content: space-between;

  & > * {
    margin: 0.5rem;
    margin-top: 0;
  }
`;

export const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 0;
  line-height: 1;
`;

export const TitleWrapper = styled.div`
  font-size: 2rem;
`;

export const Count = styled.p`
  font-size: 1rem;
  height: 1rem;
  line-height: 1;
  color: gray;
  margin: 0;
`;

export const TableHeader = styled(Row)`
  padding: 0.5rem 1.5rem;
  text-transform: capitalize;
`;

export const Actions = styled.form`
  display: flex;
  align-items: center;
`;

export const Search = styled(Button)`
  margin-left: 1rem;
`;
