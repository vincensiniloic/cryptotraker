import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import Card from '../UI/Card';

interface CryptoCardProps {
  name: string;
  symbol: string;
  currentPrice: number;
  priceChangePercentage: number;
  img:string;
}

const StyledCryptoCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
  height: 150px;
  padding: 20px;
  box-sizing: border-box;

  ${media.lessThan('medium')`
    max-width: 100%;
    height: auto;
    flex-direction: column;
    align-items: flex-start;
  `}
`;

const CryptoName = styled.h3`
  margin: 0;
  font-weight:100;
`;

const CryptoSymbol = styled.span`
  color: ${props => props.theme.colors.secondary};
  text-transform: uppercase;
`;

const CryptoPrice = styled.span`
  font-weight: 500;
`;

const PriceChange = styled.span<{ isPositive: boolean }>`
  color: ${props => props.isPositive ? props.theme.colors.positive : props.theme.colors.negative};
  font-weight: 500;
`;

const CryptoCard: React.FC<CryptoCardProps> = ({ name, symbol, currentPrice, priceChangePercentage,img }) => {
  const isPositive = priceChangePercentage >= 0;

  return (
    <StyledCryptoCard>
      <div>
        <img width={40} height={40} src={img} alt={name} />
        <CryptoName>{name} &nbsp;<CryptoSymbol>{symbol}</CryptoSymbol></CryptoName>
        <CryptoPrice>${currentPrice.toFixed(2)}</CryptoPrice>
      </div>
      <PriceChange isPositive={isPositive}>
        {isPositive ? '+' : ''}{priceChangePercentage.toFixed(2)}%
      </PriceChange>
    </StyledCryptoCard>
  );
};

export default CryptoCard;
