import styled from '@emotion/styled';
import { Menu } from '@mui/material';

export const CustomMenu = styled(Menu)`
  & .MuiPaper-root {
    width: 203px;
    margin-top: 10px;
    border-radius: 4px;
    @media (max-width: 1180px) {
      width: 150px;
    }
    @media (max-width: 766px) {
      width: 170px;
    }
  }
  .MuiMenuItem-root {
    width: 203px;
    display: flex;
    gap: 10px;
    @media (max-width: 1180px) {
      width: 150px;
    }
    @media (max-width: 766px) {
      width: 170px;
    }
  }

  position: absolute;
  left: 190px;
  top: -48px;
  @media (max-width: 760px) {
    left: -185px;
    top: -55px;
  }
`;

export const CreateButton = styled.label`
  display: flex;
  gap: 10px;
  cursor: pointer;
  width: 100%;
`;
