import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AppContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
  color: ${props => props.theme.colors.text};
`;

export const Content = styled.main``;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const PaginationButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.2em;
  }
`;

export const AnimatedContent = styled(motion.div)`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

export const pageTransition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.2,
};