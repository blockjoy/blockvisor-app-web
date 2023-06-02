import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  title: (theme: ITheme) => css`
    font-size: 16px;
    text-transform: uppercase;
    color: ${theme.colorPlaceholder};
  `,
  button: css`
    min-width: 120px;
  `,
};
