import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    position: fixed;
    z-index: 4;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${theme.colorBackground};
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromLrg} {
      padding-left: 64px;
    }

    /* @media only screen and (min-width: ${theme.screenSm}) {
      padding-left: 260px;
      z-index: 4;
    } */
  `,
  wrapperSidebarOpen: css`
    @media ${breakpoints.fromLrg} {
      padding-left: 260px;
    }
  `,
  actionsLeft: (theme: ITheme) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 580px;
    height: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 0 16px 0 64px;
    transition: all 0.3s;

    /* @media only screen and (min-width: ${theme.screenSm}) {
      opacity: 0;
      visibility: hidden;
    } */
  `,
  topbarEnd: css`
    width: 200px;
  `,
};
