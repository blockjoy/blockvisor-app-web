import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  collapseButton: css`
    display: none;

    @media ${breakpoints.fromXLrg} {
      display: block;
    }
  `,
  header: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    height: 72px;
    min-height: 72px;

    cursor: pointer;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      margin: 0 0 20px;
      display: flex;
      width: calc(100% - 16px);
    }

    path {
      fill: rgba(255, 255, 255, 0.3);
    }

    path,
    span {
      transition: 0.3s;
    }

    :hover {
      > span {
        color: rgba(255, 255, 255, 0.7);
      }
      path {
        fill: rgba(255, 255, 255, 0.7);
      }
    }
  `,
  title: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.3);
    font-size: 16px;
  `,
  filterIcon: css`
    position: relative;
    height: 14px;
    width: 14px;
  `,
  badge: (theme: ITheme) => css`
    position: absolute;
    top: -12px;
    right: -11px;
    border: 3px solid ${theme.colorBackground};
    display: grid;
    place-items: center;
    font-size: 7px;
    font-weight: 600;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    color: ${theme.colorPrimaryText};
    background: ${theme.colorPrimary};
  `,
  dropdownIcon: css`
    display: grid;
    place-items: center;
    width: 8px;
    height: 8px;

    @media ${breakpoints.fromXLrg} {
      display: none;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `,
};
