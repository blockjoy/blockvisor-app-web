import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (isSidebarOpen: boolean) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 16px;
    padding-bottom: ${isSidebarOpen ? '16px' : '4px'};
    min-width: 0;
    width: 100%;
  `,
  header: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    letter-spacing: 1.5px;
    font-size: 10px;
    margin: 0 16px 16px;
  `,
  navigation: css`
    display: flex;
    flex-direction: column;
    height: 100%;
  `,
  block: (isSidebarOpen: boolean) => css`
    margin-bottom: ${isSidebarOpen ? '24px' : '8px'};

    &:last-child {
      margin-top: auto;
      margin-bottom: 8px;
    }
  `,
  list: css`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,
  link: (theme: ITheme) => css`
    user-select: none;
    padding: 0 16px;
    display: flex;

    :is(:hover, :focus, :active) .link-inner:not(.active) {
      background: ${theme.colorHover};

      path {
        fill: ${theme.colorPrimary};
        opacity: 0.6;
      }

      span:first-of-type span {
        background: ${theme.colorPrimary};
        opacity: 0.6;
      }
    }

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
      cursor: default;
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
  linkTextHidden: (theme: ITheme) => css`
    @media ${breakpoints.fromXLrg} {
      position: absolute;
      z-index: 10;
      left: 110%;
      background: ${theme.colorTooltip};
      padding: 6px 10px;
      font-size: 12px;
      border-radius: 4px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.001s;
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
