import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  collapseButton: css`
    margin-left: auto;
    display: none;

    @media ${breakpoints.fromXLrg} {
      display: block;
    }
  `,
  header: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    height: 40px;
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
