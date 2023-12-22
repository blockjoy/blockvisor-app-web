import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  sidebar:
    (isOpen: boolean = true) =>
    (theme: ITheme) =>
      css`
        position: sticky;
        overflow: hidden;
        top: 92px;
        margin-top: 20px;
        display: grid;
        grid-auto-rows: 1fr;
        gap: 4px;
        place-items: center;
        width: 200px;
        height: calc(100vh - 112px);
        border-right: 1px solid ${isOpen ? theme.colorBorder : 'transparent'};
        margin-right: ${isOpen ? '20px' : 0};

        @media ${breakpoints.toXlrg} {
          display: none;
        }
      `,
  sidebarInner: css`
    position: absolute;
    inset: 0;
    padding-right: 20px;

    li {
      display: flex;
      height: 40px;
    }
  `,
  link: (theme: ITheme) => css`
    overflow: hidden;
    color: ${theme.colorText};
    width: 100%;
    min-width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 12px;
    border-radius: 6px;
    text-transform: capitalize;
    user-select: none;
    font-size: 13px;
    transition: 0.175s;

    path {
      fill: ${theme.colorText};
    }
  `,
  linkActive: (theme: ITheme) => css`
    color: ${theme.colorPrimary};
    background: ${rgba(theme.colorText || '#fff', 0.08)};
    cursor: default;

    path {
      fill: ${theme.colorPrimary};
    }
  `,
  linkInactive: (theme: ITheme) => css`
    opacity: 0.6;
    :hover {
      opacity: 0.85;
      background: ${rgba(theme.colorText || '#fff', 0.04)};
    }
  `,
  handle: css`
    position: absolute;
    z-index: 100;
    width: 8px;
    top: 0;
    bottom: 0;
    right: 0;
    transition: 0.3s;

    :hover,
    :active {
      background: rgb(255 255 255 / 10%);
      cursor: col-resize;
    }
  `,
};
