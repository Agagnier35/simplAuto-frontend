import styled from 'styled-components';


const StyledSummaryElement = styled.a`
  text-decoration: none;
  box-sizing: border-box;
  display: block;
  cursor: pointer;
  color: inherit;

  .card {
    width: 18rem;
  }
  &:hover {
    color: black;
    text-decoration: none;
    box-shadow: 2px 2px 70px 0px rgba(0, 0, 0, 0.1);
  }
`;

export default StyledSummaryElement;

