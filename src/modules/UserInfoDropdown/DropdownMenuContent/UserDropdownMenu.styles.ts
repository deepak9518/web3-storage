import { UserIcon } from 'src/assets/svg';
import { COLORS } from 'src/constants/colors';
import styled from '@emotion/styled';

export const MenuContainer = styled.div`
  background-color: ${COLORS.WHITE_100};
  padding-top: 29px;
  max-width: 307px;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;

  @media (max-width: 576px) {
    width: 316px;
    max-width: 316px;
  }
`;

export const CustomUserIcon = styled(UserIcon)`
  align-self: center;
`;

export const NearBalance = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: ${COLORS.BLACK_80};

  svg {
    margin-left: 9px;
    cursor: pointer;
  }
`;

export const FiatValue = styled.div`
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  margin-top: 8px;
  font-size: 13px;
  line-height: 16px;
  color: ${COLORS.GREY_70};
`;

export const StorageUsage = styled.div`
  text-align: center;
  padding-right: 34px;
  padding-left: 36px;
  width: max-content;
  font-size: 13px;
  line-height: 16px;
  margin-top: 8px;
  color: ${COLORS.GREY_70};
`;

export const StorageUsageHighlight = styled.span`
  color: ${COLORS.BLACK_80};
`;

export const MyAccountsBlock = styled.div`
  padding-bottom: 17.25px;
  margin-top: 29px;
  margin-bottom: 20px;
  border-bottom: 1px solid #dfdfe0;
  padding-left: 17px;
  padding-right: 30px;
`;

export const MyAccountsLabel = styled.div`
  margin-bottom: 15.5px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: ${COLORS.GREY_70};
`;

export const ActionBlock = styled.div`
  padding-left: 19px;
  padding-right: 61px;
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  cursor: pointer;
  color: ${COLORS.BLACK_80};

  svg {
    margin-right: 18px;
  }
`;
