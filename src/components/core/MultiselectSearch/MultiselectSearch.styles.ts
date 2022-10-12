import { COLORS } from 'src/constants/colors';
import styled from '@emotion/styled';
import { Autocomplete } from '@mui/material';
import { Tag } from './Tag';
import { TagProps } from './Tag/Tag.types';

export const StyledTag = styled(Tag)<TagProps>`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: 'rgba(255,255,255,0.08)';
  border: 1px solid '#303030';
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;
  cursor: pointer;

  &:focus {
    border-color: '#177ddc';
    background-color: '#003b57';
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${COLORS.GREY_50};
    border-radius: 6px;
    background-color: ${COLORS.BLUE_40};
    padding: 2px 7px;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

export const Listbox = styled.ul`
  margin: 2px 0 0;
  padding: 10px;
  position: absolute;
  width: 100%;
  list-style: none;
  background-color: ${COLORS.WHITE_100};
  overflow: auto;
  max-height: 175px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;
    color: ${COLORS.BLACK_100};
    cursor: pointer;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background: ${COLORS.BLUE_40};
    border-radius: 10px;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: '#003b57';
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`;

export const InputWrapper = styled.div`
  min-height: 42px;
  border: 1px solid ${COLORS.GREY_80};
  background-color: ${COLORS.WHITE_100};
  padding: 1px;
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;

  & input {
    background-color: ${COLORS.WHITE_100};
    color: ${COLORS.GREY_50};
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

export const Root = styled.div`
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
`;

export const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

export const CustomAutocomplete = styled(Autocomplete)``;
