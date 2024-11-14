import React from 'react';
import CryptoCard from './CryptoCard';
import CryptoCardContainer from './CryptoCardContainer';

const CryptoList: React.FC = () => {
  const cryptoData = [
    { name: 'Bitcoin', symbol: 'BTC', currentPrice: 50000, priceChangePercentage: 2.5 },
    { name: 'Ethereum', symbol: 'ETH', currentPrice: 4000, priceChangePercentage: -1.2 },
    { name: 'Ripple', symbol: 'XRP', currentPrice: 1.2, priceChangePercentage: 0.5 },
    // Add more crypto data as needed
  ];

  return (
    <CryptoCardContainer>
      {cryptoData.map((crypto, index) => (
        <CryptoCard
         img="https://www.coingecko.com/static/img/coins/small/bitcoin.png" // Replace with actual image URL
          key={index}
          name={crypto.name}
          symbol={crypto.symbol}
          currentPrice={crypto.currentPrice}
          priceChangePercentage={crypto.priceChangePercentage}
        />
      ))}
    </CryptoCardContainer>
  );
};

export default CryptoList;