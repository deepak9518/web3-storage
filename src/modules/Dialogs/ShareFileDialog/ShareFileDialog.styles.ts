
import { COLORS } from 'src/constants/colors';
import styled from '@emotion/styled';
import { SelectProps } from '@mui/material';
import { DialogWindow } from 'src/components/core/DialogWindow';
import Button from 'src/components/core/Button';
import { Select } from 'src/components/core/Select';
import MultiselectSearch from 'src/components/core/MultiselectSearch/MultiselectSearch';

export const CustomDialogWindow = styled(DialogWindow)`
  padding-left: 32px;
  padding-right: 38px;
  #dialog-wrapper {
    padding: 0;
  }

  #dialog-header {
    border-bottom: 1px solid ${COLORS.GREY_100};
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
  max-height: 80vh;
  overflow-y: auto;
  height: 30vh;
`;

export const ShareLable = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 10px;
  color: ${COLORS.BLACK_100};
`;

export const SearchBar = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

export const CustomButton = styled(Button)`
  margin-left: 8px;
  padding: 9px 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  height: 40px;

  @media (max-width: 576px) {
    display: none;
  }
`;

export const CustomMobileButton = styled(Button)`
  margin-top: 8px;
  padding: 9px 10px;
  font-weight: 600;
  font-size: 14px;
  width: 100%;
  line-height: 22px;
  height: 40px;
`;

export const MobileShareButtonWrapper = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    margin-left: 8px;
    padding: 9px 10px;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }
`;

export const MobileCustomButton = styled(Button)`
  padding: 9px 10px;
  margin-left: 21px;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  height: 40px;
  max-width: 122px;
  width: 100%;
`;

export const CustomSelect = styled(Select)<SelectProps<string | number>>`
  border-radius: 0;
  font-size: 14px;
  line-height: 22px;
  height: 42px;

  @media (max-width: 900px) {
    flex: 1;
  }

  fieldset {
    border-left: 0;
  }
`;

export const CustomMultiselectSearch = styled(MultiselectSearch)`
  width: 100%;

  @media (max-width: 900px) {
    flex: 2;
    max-width: 150px;
  }
`;

export const AnyOneWithLink = styled.div`
  display: flex;
  align-items: center;

  div,
  span {
    color: #489cff;
  }
  span {
    font-size: 14px;
  }
`;

export const AnyOneWithLinkWrapper = styled.table`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dfdfe0;
  padding: 14px 0;
`;

export const UsersTable = styled.table`
  width: 100%;
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #b6babd;
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

export const ErrorDiv = styled.div`
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  color: ${COLORS.RED_100};
`;
