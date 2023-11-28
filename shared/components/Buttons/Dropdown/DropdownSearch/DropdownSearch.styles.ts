import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  input: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    border-bottom: 1px solid ${theme.colorBorderGrey};
    outline: none;
    color: ${theme.colorText};
    height: 44px;
    min-width: 40 0px;
    padding: 20px 12px;

    @media ${breakpoints.toMed} {
      min-width: 100%;
    }

    @media ${breakpoints.fromXLrg} {
      min-width: 100%;
    }
  `,
  empty: (theme: ITheme) => css`
    padding: 12px;
    font-size: 12px;
    text-align: center;
    color: ${theme.colorPlaceholder};
  `,
};
