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
    padding: 0 8px;
    height: 44px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${theme.colorText};
    font-size: 13px;
    border-radius: 8px;

    &.active {
      background: ${theme.colorActive};
    }

    & path {
      fill: ${theme.colorLabel};
    }

    .link-icon > span {
      color: ${theme.colorPrimaryText};
      font-weight: 600;
    }

    &.active .link-icon > span {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }

    &.active path {
      fill: ${theme.colorPrimary};
    }
  `,

  linkText: css`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
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
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
    }
  `,
  linkIcon: css`
    display: grid;
    place-items: center;

    svg {
      width: 16px;
      height: 16px;
    }
  `,
  linkIconSidebarOpen: css`
    @media ${breakpoints.fromXLrg} {
      scale: 1.05;
    }
  `,
};
