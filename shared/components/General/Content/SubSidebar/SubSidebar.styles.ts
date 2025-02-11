import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    gap: 4px;

    @media ${breakpoints.fromMed} {
      position: sticky;
      top: 92px;
      z-index: 2;
      margin-top: 20px;
      padding-right: 20px;
      min-width: 200px;
      height: calc(100vh - 112px);
      border-right: 1px solid ${theme.colorBorder};
    }

    @media ${breakpoints.toMed} {
      margin-top: 30px;
      border-bottom: 1px solid ${theme.colorBorder};
    }
  `,
  item: css`
    margin-bottom: 20px;
  `,
  nav: css`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,
  title: css`
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 10px;
  `,
  link: (theme: ITheme) => css`
    overflow: hidden;
    color: ${theme.colorText};
    width: 100%;
    white-space: nowrap;
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
    padding: 10px;

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
