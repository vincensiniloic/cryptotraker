import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface CryptoModalProps {
  crypto: {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    image: string;
  };
  onClose: () => void;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: #FFFF;
  color: #0000;
  padding: 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ChartContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CryptoInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color:#000;
`;

const CryptoImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

const CryptoName = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 100;
`;

const CryptoSymbol = styled.span`
  color: ${props => props.theme.secondaryText};
  font-size: 18px;
`;

const PriceInfo = styled.div<{ isPositive: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  color: ${props => props.isPositive ? 'green' : 'red'};
`;

const Price = styled.p<{ isPositive: boolean }>`
  font-size: 20px;
  font-weight: 100;
  margin: 0;
  color: ${props => props.isPositive ? 'green' : 'red'};
`;

const PriceChange = styled.p<{ isPositive: boolean }>`
  color: ${props => props.isPositive ? 'green' : 'red'};
  font-size: 18px;
  margin: 0;
`;

const CloseButton = styled.button`
  background-color: ${props => props.theme.buttonBackground};
  color: ${props => props.theme.buttonText};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.buttonHoverBackground};
  }
`;

const CryptoModal: React.FC<CryptoModalProps> = ({ crypto, onClose }) => {
    const [historicalData, setHistoricalData] = useState([]);
  
    useEffect(() => {
      const fetchHistoricalData = async () => {
        try {
          const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart?vs_currency=usd&days=7`);
          const formattedData = response.data.prices.map(([timestamp, price]: [number, number]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            price: price,
          }));
          setHistoricalData(formattedData);
        } catch (error) {
          console.error("Error fetching historical data:", error);
        }
      };
  
      fetchHistoricalData();
    }, [crypto.id]);
  
    return (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <CryptoInfo>
              <CryptoImage src={crypto.image} alt={crypto.name} />
              <div>
                <CryptoName>{crypto.name} <CryptoSymbol>({crypto.symbol.toUpperCase()})</CryptoSymbol></CryptoName>
              </div>
            </CryptoInfo>
    
            <PriceInfo isPositive={crypto.price_change_percentage_24h >= 0}>
              <Price isPositive={crypto.price_change_percentage_24h >= 0}>${crypto.current_price.toLocaleString()}</Price>
              <PriceChange isPositive={crypto.price_change_percentage_24h >= 0}>
                {crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'} {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
              </PriceChange>
            </PriceInfo>
            
            <ChartContainer>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{fill: '#888', fontSize: 12}}
                    axisLine={{stroke: '#888'}}
                  />
                  <YAxis 
                    tick={{fill: '#888', fontSize: 12}}
                    axisLine={{stroke: '#888'}}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <Tooltip 
                    contentStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px'}}
                    labelStyle={{color: '#333'}}
                  />
                  <Line 
                    type="linear" 
                    dataKey="price" 
                    stroke="#3498db" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{r: 8}}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            
            <CloseButton onClick={onClose}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      );
    };
    
    export default CryptoModal;