import styled from '@emotion/styled';

import { COLORS } from 'src/constants/colors';

export const DivProgressBarMain = styled.div`
  display: flex;
  background-color: ${COLORS.GREEN_30};
  align-items: center;
  padding: 20px;
  border-radius: 10px;

  > span {
    margin-left: 10px;
    color: ${COLORS.GREEN_90};
  }
`;

export const DivImageWrapper = styled.div`
  filter: invert(41%) sepia(82%) saturate(6681%) hue-rotate(143deg) brightness(99%) contrast(74%);
  margin-left: 10px;
`;
