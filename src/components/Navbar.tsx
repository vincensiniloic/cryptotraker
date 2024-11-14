import React, { useState } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.navBackground};
`;

const Logo = styled.h1`
  margin: 0;
  color: ${props => props.theme.colors.primary};
  flex: 1;
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.border};
  outline: none;
  width: 100%;
  max-width: 200px;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;
const NavContainer = styled.div`
  max-width:1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
    @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

`;
const ThemeToggle = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
interface NavbarProps {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setIsDarkMode }) => {
  const toggleTheme = () => {
    setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
  };
  return (
    <NavbarContainer>
      <NavContainer>
      <Logo>CryptoTracker</Logo>
      <SearchInput placeholder="Search cryptocurrencies..." />
      <ThemeToggle onClick={toggleTheme}>
          Toggle Theme
        </ThemeToggle>
      </NavContainer>
    </NavbarContainer>
  );
};

export default Navbar;
