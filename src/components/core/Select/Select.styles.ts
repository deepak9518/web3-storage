import styled from '@emotion/styled';
import { css, Select } from '@mui/material';

export const CustomSelect = styled(Select)<{ withOutline?: boolean }>`
  border-radius: 0;
  font-size: 14px;
  line-height: 22px;

  ${({ withOutline }) =>
    withOutline
      ? null
      : css`
          [role='button'] {
            padding: 0;
          }

          fieldset {
            border: 0;
          }
        `}
`;
