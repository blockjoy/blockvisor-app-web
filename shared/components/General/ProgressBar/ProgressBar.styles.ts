import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 11;
    height: 3px;
    background-color: ${theme.colorPrimary};
    transition: width 300ms ease-out, opacity 150ms 150ms ease-in;
    transform: translate3d(0, 0, 0);
  `,
};
