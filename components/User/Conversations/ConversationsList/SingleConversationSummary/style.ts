import styled from 'styled-components';

export const ContainerConversation = styled.div`
  min-height: 50px;
  display: flex;
  flex-flow: row wrap;
  border-bottom-style: solid;
  border-right-style: solid;
  border-color: black;
  border-width: 0.05rem;
  border-radius: 5px;
`;

export const Body = styled.div`
  padding: 1.5rem;
  display: -webkit-flex; /* Safari */
  -webkit-flex-flow: row wrap; /* Safari 6.1+ */
  display: flex;
  flex-flow: row wrap;

  & > img {
    border-radius: 100px;
    width: 120px;
    max-height: 120px;
    height: 100%;
    object-fit: contain;
    object-position: center;
    box-shadow: inset -8px 9px 23px -12px #0000001c;
    display: inline-block;
  }
`;

export const Header = styled.div`
  padding-left: 1.5rem;
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
