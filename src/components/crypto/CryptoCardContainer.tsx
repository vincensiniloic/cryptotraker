import styled from 'styled-components';
import media from 'styled-media-query';

const CryptoCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  ${media.greaterThan('medium')`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

export default CryptoCardContainer;
