import { COLORS } from 'src/constants/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const DialogBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(4, 4, 4, 0.25);
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const DialogWrapper = styled.div<{ maximumWidth?: number; fullWidth?: boolean; side?: boolean }>`
  background: ${COLORS.WHITE_100};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 19px 22px;
  height: fit-content;
  ${({ maximumWidth }) =>
    maximumWidth
      ? css`
          max-width: ${`${maximumWidth}px`};
        `
      : null}

  ${({ fullWidth }) =>
    fullWidth
      ? css`
          width: 100%;
        `
      : null}

      ${({ side }) =>
    side
      ? css`
          right: 0;
          position: absolute;
          top: 0;
          bottom: 0;
          height: 100%;
          margin-top: 0;
          border-radius: 0;
          border: 1px solid ${COLORS.GREY_100};
        `
      : null}
`;

export const DialogBody = styled.div``;

export const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    cursor: pointer;
  }
`;
