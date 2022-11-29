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
    height: 50px;
    cursor: pointer;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      display: flex;
      width: 100%;
    }

    & path {
      fill: rgba(255, 255, 255, 0.3);
    }
  `,
  title: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.3);
    font-size: 13px;
  `,
  filterIcon: css`
    position: relative;
    height: 12px;
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
