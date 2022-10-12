
import styled from '@emotion/styled';
import { SelectProps } from '@mui/material';
import Button from 'src/components/core/Button';
import { DialogWindow } from 'src/components/core/DialogWindow';
import MultiselectSearch from 'src/components/core/MultiselectSearch/MultiselectSearch';
import { Select } from 'src/components/core/Select';
import { COLORS } from 'src/constants/colors';

export const CustomDialogWindow = styled(DialogWindow)`
  padding-left: 32px;
  padding-right: 38px;
  #dialog-wrapper {
    padding: 0;
    overflow: hidden;
  }

  #dialog-header {
    padding: 13px 13px 11px 22px;
  }
`;

export const HeaderTitle = styled.span`
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: ${COLORS.BLACK_100};
`;

export const ContentWrapper = styled.div`
  padding: 30px 29px 25px;
`;

export const ShareLable = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: ${COLORS.BLACK_100};
`;

export const SearchBar = styled.div`
  display: flex;
  position: relative;
  height: 42px;
  width: 100%;
`;

export const CustomSelect = styled(Select)<SelectProps<string | number>>`
  border-radius: 0;
  font-size: 14px;
  line-height: 22px;

  fieldset {
    border-left: 0;
  }
`;

export const CustomMultiselectSearch = styled(MultiselectSearch)`
  width: 100%;
`;

export const UsersTable = styled.table`
  width: 100%;
  margin-top: 50px;
`;

export const UsersTableRow = styled.tr`
  th {
    padding-bottom: 14px;
    border-bottom: 1px solid ${COLORS.GREY_100};
    margin-bottom: 13px;
  }

  td {
    margin: 20px;
  }
`;

export const LinkBlock = styled.div`
  color: ${COLORS.BLUE_80};
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;

  span {
    margin-left: 4px;
    margin-right: 8px;
  }
`;

export const ShareButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 37px;
`;
export const ModalContentWrapper = styled.div`
  background-color: ${COLORS.WHITE_100};
  display: 'flex';
  align-items: 'center';
  justify-content: 'center';
`;

export const paddingText = styled.div`
  padding-top: 10px;
  width: '100%';
`;

export const heading = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 15px;
  padding-left: 15px;
`;

export const Border = styled.div`
  margin-top: 20px;
  border: 1px solid ${COLORS.GREY_80};
  box-sizing: border-box;

  border-right: none;
  border-left: none;
  padding: 10px;
`;

export const DollerPrice = styled.div`
  font-size: 14px;
  margin-left: 250px;
  color: ${COLORS.BLACK_70};
`;

export const NEARText = styled.div`
  font-size: 14px;
  flex: 1;
  justify-content: flex-end;
  display: flex;
  color: ${COLORS.GREY_80};
`;

export const TransectionPriceText = styled.div`
  font-size: 14px;
  color: ${COLORS.GREY_60};
  flex: 1;
  justify-content: flex-end;
  display: flex;
`;

export const TransectionFeeText = styled.div`
  font-size: 14px;
  color: ${COLORS.GREY_60};
`;

export const GasFeeText = styled.div`
  font-size: 14px;
  flex: 1;
  justify-content: flex-end;
  color: ${COLORS.GREY_80};
`;

export const CustomButton = styled(Button)`
  margin-left: 8px;
  padding: 10px 14px;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  flex: 1;
  max-width: 80px;
  margin-right: 15px;
`;
export const CustomButtonCancel = styled.div`
  margin-left: 8px;
  padding: 10px 14px;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
`;
export const alignUserLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 30px;
`;
export const AlignRow = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
`;
