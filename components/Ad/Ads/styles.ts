import styled from 'styled-components';
import { Card, CardColumns } from 'react-bootstrap';

const StyledAdsSummary = styled(CardColumns)`
  column-count: 1;
  overflow-y: scroll;
  overflow: hidden;

  .card {
    margin-left: 0px;
  }
`;

export default StyledAdsSummary;
