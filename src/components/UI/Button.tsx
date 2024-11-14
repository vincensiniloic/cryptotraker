import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

export default Button;