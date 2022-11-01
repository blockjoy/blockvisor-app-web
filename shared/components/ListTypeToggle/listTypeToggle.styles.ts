import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    display: flex;
    gap: 8px;
  `,
  iconButton: (theme: ITheme) => css`
    display: block;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;

    & path {
      fill: ${theme.colorLabel};
    }
  `,
  iconButtonActive: (theme: ITheme) => css`
    & path {
      fill: ${theme.colorText};
    }
  `,
};
