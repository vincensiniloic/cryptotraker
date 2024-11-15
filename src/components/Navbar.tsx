import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.navBackground};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
const Logo = styled.h1`
  margin: 0;
  color: ${props => props.theme.colors.primary};
  flex: 1;

  @media (max-width: 768px) {
    margin-bottom: 10px;
    text-align: center;
  }
`;

const SearchAndToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
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

  @media (max-width: 768px) {
    max-width: none;
    flex-grow: 1;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }
`;
interface NavbarProps {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setIsDarkMode, isDarkMode, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTheme = () => {
    setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    onSearch(newTerm); // Appeler onSearch à chaque changement
  };

  return (
    <NavbarContainer>
      <NavContainer>
        <Logo>CryptoTracker</Logo>
        <SearchAndToggleContainer>
          <SearchInput 
            placeholder="Search cryptocurrencies..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <ThemeToggle onClick={toggleTheme}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </ThemeToggle>
        </SearchAndToggleContainer>
      </NavContainer>
    </NavbarContainer>
  );
};

export default Navbar;