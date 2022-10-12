import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { Menu } from '@mui/material';

export const CustomButton = styled(Button)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  /* identical to box height, or 157% */

  text-align: center;
  letter-spacing: -0.408px;

  color: #ffffff;
  text-transform: none;
  width: 100%;
  height: 40px;
  background: #2d80e1;
  border-radius: 0;
  box-shadow: none;

  &:hover {
    background: #2d80e1;
  }
`;

export const CustomMenu = styled(Menu)`
  & .MuiPaper-root {
    width: 203px;
    margin-top: 10px;
    border-radius: 4px;
  }
  .MuiMenuItem-root {
    width: 203px;
    display: flex;
    gap: 10px;
  }
`;

export const CreateFileMenu = styled(Menu)`
  & .MuiPaper-root {
    width: 192px;
    margin-top: -40px;
    margin-left: 203px;
    border-radius: 4px;

    @media (max-width: 900px) {
      margin-left: -190px;
    }
  }
  .MuiMenuItem-root {
    width: 192px;
    display: flex;
    gap: 10px;
  }
`;

export const CustomArrowRight = styled.div`
  position: absolute;
  top: 7px;
  right: 15px;
`;

export const InputFile = styled.input`
  display: none;
`;

export const UploadFileButton = styled.label`
  display: flex;
  gap: 10px;
  cursor: pointer;
  width: 100%;
`;

export const ButtonRightIcon = styled.div`
  align-self: center;
  margin-left: auto;
`;
