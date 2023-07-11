import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  button: css`
    min-width: 130px;
  `,
  icon: (theme: ITheme) => css`
    path {
      fill: ${theme.colorText};
    }
  `,
};
