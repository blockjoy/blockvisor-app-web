import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px 0;
    min-width: 0;
    width: 100%;
  `,
  header: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    letter-spacing: 1.5px;
    font-size: 10px;
    margin: 0 16px 16px;
  `,
  list: css`
    margin-bottom: 24px;
    display: grid;
    gap: 6px;
  `,
  link: (theme: ITheme) => css`
    user-select: none;
    padding: 0 16px;
    display: flex;

    @media ${breakpoints.fromXLrg} {
      :hover .link-text {
        opacity: 1;
        visibility: visible;
      }
    }
  `,
  linkSidebarCollapsed: css`
    padding: 0 11px;

    & > span {
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  `,
  linkInner: (theme: ITheme) => css`
    flex: 1 1 auto;
    width: 100%;
    padding: 12px 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${theme.colorText};
    font-size: 13px;
    border-radius: 8px;

    &.active {
      background: ${theme.colorActive};
    }

    & path {
      fill: ${theme.colorLabel};
    }

    &.active span {
      border-color: ${theme.colorPrimary};
    }

    &.active path {
      fill: ${theme.colorPrimary};
    }
  `,

  linkText: css`
    line-height: 1;
  `,
  linkTextHidden: css`
    @media ${breakpoints.fromXLrg} {
      position: absolute;
      left: 110%;
      background: #0c0c02;
      padding: 6px 10px;
      font-size: 12px;
      border-radius: 4px;
      opacity: 0;
      visibility: hidden;
    }
  `,
  linkIcon: css`
    min-width: 20px;

    svg {
      translate: 2px 2px;
    }
  `,
  linkIconSidebarOpen: css`
    @media ${breakpoints.fromXLrg} {
      scale: 1.15;
    }
  `,
};
