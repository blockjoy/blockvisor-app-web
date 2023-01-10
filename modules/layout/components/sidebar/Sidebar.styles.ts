import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    display: flex;
  `,
  sidebar: (theme: ITheme) => css`
    position: fixed;
    z-index: 8;
    top: 30px;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 260px;
    height: calc(100% - 30px);
    border-right: 1px solid ${theme.colorBorder};
    background: ${theme.colorSidebar};
    transform: translateX(-100%);

    @media ${breakpoints.toXlrg} {
      top: 0;
      padding-top: 30px;
      height: 100%;
      transition-property: transform;
      transition-duration: 0.4s;
    }

    transform: translateX(0);
    z-index: 5;
  `,
  sidebarOpen: css`
    transform: translateX(0);
    z-index: 10;
  `,
  sidebarClosed: css`
    @media ${breakpoints.toXlrg} {
      transform: translateX(-100%);
      z-index: 5;
    }

    @media ${breakpoints.fromXLrg} {
      width: 64px;
    }
  `,
};
