import styled from 'styled-components';

export const ContainerConversation = styled.div`
  min-height: 110px;
  display: flex;
  flex-flow: row wrap;
  border-radius: 0.25rem;
  cursor: pointer;

  .btn {
    float: right;
  }
`;

export const Body = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  & > img {
    border-radius: 100px;
    width: 80px;
    height: 80px;
    background: white;
    object-fit: contain;
    object-position: center;
    box-shadow: inset 0 0 14px 2px #00000026;
    display: inline-block;
  }
`;

export const Header = styled.div`
  padding-left: 1.5rem;
  flex-grow: 1;
`;

export const Title = styled.div`
  text-transform: uppercase;
  color: ${props => props.theme.colors.secondaryDarker};
  line-height: 1;
  font-weight: 500;
  margin-bottom: 0;
  display: flex;
  align-items: center;

  a {
    color: ${props => props.theme.colors.secondaryDarker};
  }
`;
