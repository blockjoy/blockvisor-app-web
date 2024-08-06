import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  primaryBtn: css`
    min-width: 140px;
  `,
  deleteBtn: (theme: ITheme) => css`
    &:hover {
      svg {
        path {
          fill: ${theme.colorDanger};
        }
      }
    }
  `,
};
