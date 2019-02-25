import React from 'react';
import { IoMdCar } from 'react-icons/io';
import styled from 'styled-components';

const Header = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  flex-direction: column;
  padding: 1rem 0;
  border-radius: 4px 4px 0 0;

  svg {
    font-size: 5rem;
  }
`;

const BrandHeader = () => {
  return (
    <Header>
      <IoMdCar />
      Simplauto
    </Header>
  );
};

export default BrandHeader;
