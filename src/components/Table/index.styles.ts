import styled from '@emotion/styled';
import { TableContainer, TableRow, Typography } from '@mui/material';
import { COLORS } from 'src/constants/colors';

export const Title = styled.span`
  margin: 2rem 2rem 0;
  font-size: 18px;
  line-height: 22px;
  color: ${COLORS.BLACK_80};
`;

export const CustomTableContainer = styled(TableContainer)`
  .MuiTableHead-root {
    border-bottom: 2px solid ${COLORS.GREY_100};
  }

  .MuiTableCell-root {
    padding: 0.5rem;
  }
`;

export const TblRow = styled(TableRow)`
  &:hover {
    cursor: pointer;
  }
`;

interface IInlineContainerProps {
  component?: string;
}

export const InlineContainer = styled.button<IInlineContainerProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ffffff;
  border-width: 0;
  border: 0ch;
  &:hover {
    cursor: ${(props) => (props.component === 'button' ? 'pointer' : '')};
  }
`;

export const PathText = styled(Typography)`
  color: ${COLORS.GREY_50};
  font-weight: 400;
`;

export const FileType = styled(Typography)<{ active?: boolean }>`
  color: ${(props) => (props.active ? COLORS.INDIGO_100 : COLORS.GREY_50)};
  font-size: 16px;
  font-weight: 500;
  margin-right: 50px;
  background-color: ${(props) => (props.active ? '#EBF8FF' : '')};
  padding: 6px 15px;
  border-radius: 4px;
  font-weight: 400;

  &:hover {
    cursor: pointer;
  }
`;

export const IconContainerLeft = styled.div`
  border: 1px solid ${COLORS.GREY_80};
  box-sizing: border-box;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: none;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const IconContainerRight = styled.div`
  border: 1px solid ${COLORS.GREY_80};
  box-sizing: border-box;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;
export const CellBg = styled.div`
  padding: 3px 6px;
  background: #e0e0e0;
  display: inline-block;
`;

export const TblHeadText = styled.p`
  font-weight: 500;
  color: ${COLORS.GREY_50};
`;

export const TblBodyText = styled.p`
  margin: 0;
  font-size: 15px;
  max-width: 70vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Rotation = styled.span<{ flip?: boolean }>`
  transform: ${(props) => (props.flip ? 'rotate(180deg)' : '')};
`;

export const Redirect = styled.a<{ active?: boolean }>`
  text-decoration: none;
  color: ${(props) => (props.active ? COLORS.INDIGO_100 : COLORS.GREY_50)};
  font-size: 16px;
  font-weight: 500;
  background-color: ${(props) => (props.active ? '#EBF8FF' : '')};

  border-radius: 4px;
  font-weight: 400;

  &:hover {
    cursor: pointer;
  }
`;
export const IconContainer = styled.div`
  width: 40;
`;
