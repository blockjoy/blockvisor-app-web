import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 12px;
    height: 40px;
    cursor: pointer;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      display: flex;
      width: 100%;

      cursor: default;
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
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 11px;
  `,
  dropdownIcon: css`
    display: grid;
    place-items: center;
    width: 8px;
    height: 8px;

    @media ${breakpoints.fromLrg} {
      display: none;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `,
};
