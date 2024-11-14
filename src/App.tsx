import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import CryptoCard from './components/crypto/CryptoCard';
import axios from 'axios';

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
  const [cryptos, setCryptos] = useState<Crypto[]>([]);



  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
            sparkline:  true,
          }
        });
        console.log('API response:', response.data);
        setCryptos(response.data);
      } catch (error) {
        console.error("Error fetching data from CoinGecko:", error);
      }
    };

    fetchCryptos();
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppContainer>
        <Navbar setIsDarkMode={setIsDarkMode}/>
        <Content>
          {cryptos.map(crypto => (
            <CryptoCard
              key={crypto.id}
              name={crypto.name}
              symbol={crypto.symbol}
              currentPrice={crypto.current_price}
              priceChangePercentage={crypto.price_change_percentage_24h}
              img={crypto.image}
            />
          ))}
        </Content>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

