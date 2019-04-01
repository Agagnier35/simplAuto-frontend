import styled from 'styled-components';

export const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h3 {
    font-size: 2rem;
    text-transform: uppercase;
    text-align: center;
    margin: 2rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: -0.5rem;

  & > * {
    margin: 0.5rem;
  }
`;

export const CarsIcons = styled.div`
  font-size: 1.5rem;

  .filled {
    color: ${props => props.theme.colors.primary};
  }

  .empty {
    color: ${props => props.theme.colors.secondaryDarker};
  }
`;
