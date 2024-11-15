import React, { useState, useEffect,useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import CryptoCard from './components/crypto/CryptoCard';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const lightTheme = {
  colors: {
    background: '#f5f5f5',
    text: '#333',
    primary: '#3498db',
    secondary: '#7d8380',
    navBackground: '#fff',
    cardBackground: '#fff',
    border: '#ddd',
    positive: '#2ecc71',
    negative: '#e74c3c',
  },
};

const darkTheme = {
  colors: {
    background: '#333',
    text: '#f5f5f5',
    primary: '#3498db',
    secondary: '#7d8380',
    navBackground: '#222',
    cardBackground: '#444',
    border: '#555',
    positive: '#2ecc71',
    negative: '#e74c3c',
  },
};

const AppContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
  color: ${props => props.theme.colors.text};
`;

const Content = styled.main`
  
`;


const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const PaginationButton = styled.button`
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

const AnimatedContent = styled(motion.div)`
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
interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [allCryptos, setAllCryptos] = useState<Crypto[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const perPage = 16;

  useEffect(() => {
    const fetchAllCryptos = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 300,
            page: 1,
            sparkline: false
          }
        });
        setAllCryptos(response.data);
      } catch (error) {
        console.error("Error fetching data from CoinGecko:", error);
      }
    };

    fetchAllCryptos();
  }, []);

  const filteredCryptos = useMemo(() => {
    return allCryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCryptos, searchTerm]);

  const paginatedCryptos = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return filteredCryptos.slice(startIndex, startIndex + perPage);
  }, [filteredCryptos, page]);

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.2,
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppContainer>
        <Navbar 
          setIsDarkMode={setIsDarkMode} 
          isDarkMode={isDarkMode} 
          onSearch={handleSearch}
        />
        <Content>
          <AnimatePresence mode="wait">
            <AnimatedContent
              key={page + searchTerm}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
            >
              {paginatedCryptos.map(crypto => (
                <CryptoCard
                  key={crypto.id}
                  name={crypto.name}
                  symbol={crypto.symbol}
                  currentPrice={crypto.current_price}
                  priceChangePercentage={crypto.price_change_percentage_24h}
                  img={crypto.image}
                />
              ))}
            </AnimatedContent>
          </AnimatePresence>
        </Content>
        <PaginationContainer>
          <PaginationButton onClick={handlePrevPage} disabled={page === 1}>
            <FaChevronLeft />
          </PaginationButton>
          <PaginationButton onClick={handleNextPage} disabled={paginatedCryptos.length < perPage}>
            <FaChevronRight />
          </PaginationButton>
        </PaginationContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;