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
    justify-content: space-between;
    height: 72px;
    min-height: 72px;
    margin-bottom: 20px;
    cursor: pointer;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      display: flex;
    }

    path {
      fill: rgba(255, 255, 255, 0.3);
    }

    path,
    span {
      transition: 0.3s;
    }
  `,
  filtersButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;

    :hover {
      > span {
        color: rgba(255, 255, 255, 0.7);
      }
      path {
        fill: rgba(255, 255, 255, 0.7);
      }
    }
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
  orgPicker: css`
    @media ${breakpoints.fromLrg} {
      display: none;
    }
  `,
};
