import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  cursor: pointer;

  svg {
    font-size: 1.15rem;
  }

  a + a div {
    border-top: 1px solid #1aac8138;
  }
`;

export const Badge = styled.span`
  background: ${props => props.theme.colors.primary};
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 0.42em;
  height: 1.5em;
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  transform: translate(50%, -30%);
`;

export const Popup = styled.div`
  position: absolute;
  right: 0;
  top: 49px;
  background: white;
  width: 600px;
  border-radius: 0.25rem;
  box-shadow: 0 0 8px 1px #0000004f;
  color: black;
  overflow: hidden;
  transition: 0.5s ease;
  max-height: ${(props: { isOpen: boolean }) => (props.isOpen ? '60vh' : '0')};
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

export const Icon = styled.div`
  background: ${props => props.theme.colors.primary};
  border-radius: 50px;
  color: white;
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
