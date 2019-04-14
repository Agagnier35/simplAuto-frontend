import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: column;

  & > * {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  button {
    width: 100%;
  }
`;
