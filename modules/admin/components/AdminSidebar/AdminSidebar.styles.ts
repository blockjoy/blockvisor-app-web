import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  sidebar: (theme: ITheme) => css`
    background: #2a2c2b;
    padding: 20px;
    position: sticky;
    top: 92px;
    display: grid;
    grid-auto-rows: 1fr;
    gap: 4px;
    place-items: center;
    border-radius: 6px;
    min-width: 200px;
    height: 220px;
  `,
  link: (theme: ITheme) => css`
    color: ${theme.colorText};
    width: 100%;
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
};
