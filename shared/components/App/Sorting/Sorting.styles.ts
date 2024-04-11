import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    @media ${breakpoints.fromLrg} {
      min-width: 180px;
      margin-left: auto;
      display: flex;
      justify-content: flex-end;
    }
  `,
  dropdownButton: (theme: ITheme) => css`
    @media ${breakpoints.toLrg} {
      display: grid;
      place-items: center;
      background: transparent;
      border: 0;
      cursor: pointer;
      padding: 0 4px;
      height: 30px;
      width: 30px;
      border-radius: 6px;

      path {
        fill: ${theme.colorLabel};
      }

      &:hover,
      &:active,
      &:focus {
        background: ${theme.colorActive};
        & path {
          fill: ${theme.colorText};
        }
      }
    }
  `,
  dropdownMenu: css`
    top: 52px;
    left: 0;
    right: auto;
    overflow: hidden;
    max-width: 180px;
    min-width: 180px;

    @media ${breakpoints.toLrg} {
      top: 36px;
    }
  `,
  buttonText: css`
    @media ${breakpoints.toLrg} {
      display: none;
    }
  `,
};
