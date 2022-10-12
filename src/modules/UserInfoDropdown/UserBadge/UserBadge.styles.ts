import { COLORS } from 'src/constants/colors';
import styled from '@emotion/styled';

export const UserBadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    margin-right: 16px;
  }
`;

export const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 3px;
  color: ${COLORS.BLACK_80};
`;

export const UserBalance = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: ${COLORS.GREY_50};
`;
