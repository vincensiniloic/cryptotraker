import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

import Navbar from './components/Navbar';
import CryptoCard from './components/crypto/CryptoCard';
import CryptoModal from './components/crypto/CryptoModal';
import { AppContainer, Content, PaginationContainer, PaginationButton, AnimatedContent, pageVariants, pageTransition } from './App.styles';
import { lightTheme, darkTheme } from './theme';

// Types
interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

// Main App component
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [allCryptos, setAllCryptos] = useState<Crypto[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const perPage = 16;

  // Fetch crypto data
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

  // Filter and paginate cryptos
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

  // Event handlers
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
  const handleCryptoClick = (crypto: Crypto) => {
    setSelectedCrypto(crypto);
  };

  const handleCloseModal = () => {
    setSelectedCrypto(null);
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
                  onClick={() => handleCryptoClick(crypto)}
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
        <AnimatePresence>
          {selectedCrypto && (
            <CryptoModal
              crypto={selectedCrypto}
              onClose={handleCloseModal}
            />
          )}
        </AnimatePresence>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;