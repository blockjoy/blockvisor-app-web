import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    display: flex;
  `,
  iconButton: (theme: ITheme) => css`
    display: block;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 27px 0 14px 10px;
    translate: 0 -50%;

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
