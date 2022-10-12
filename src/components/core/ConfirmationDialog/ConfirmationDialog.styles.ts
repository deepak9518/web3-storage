import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const BoxModal = styled(Box)`
  max-width: 467px;
  margin: 2px;
  width: calc(100% - 2px);
  background-color: #ffffff;
  padding: 3rem;
  box-sizing: border-box;
  border-radius: 6px;

  @media (max-width: 900px) {
    max-width: 391px;
  }

  @media (max-width: 375px) {
    max-width: 330px;
  }
`;

export const Footer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;

  text-align: center;
  letter-spacing: -0.408px;

  color: #1d2c3c;
`;

export const Wallet = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 20px;
  /* width: 170px; */
  align-items: center;
  padding: 5px;
  gap: 5px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 2rem 0;
  border: 1px solid #c4c4c4;
  padding: 1rem;
  margin: 30px -49px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MainFee = styled.div`
  display: flex;
  gap: 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: -0.408px;
  color: #5e6872;
`;

export const GasFees = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.408px;
  color: #8f969d;
`;

export const Price = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.408px;
  color: #1d2c3c;
`;
