import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    display: flex;
  `,
  sidebar: (theme: ITheme) => css`
    position: fixed;
    z-index: 8;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 260px;
    height: 100%;
    border-right: 1px solid ${theme.colorBorder};
    background: ${theme.colorSidebar};
    transform: translateX(-100%);

    transition-property: transform;
    transition-duration: 0.4s;

    @media only screen and (min-width: ${theme.screenSm}) {
      transform: translateX(0);
      z-index: 5;
    }
  `,
  sidebarOpen: css`
    transform: translateX(0);
  `,
  sidebarClosed: css`
    transform: translateX(-100%);
  `,
};
