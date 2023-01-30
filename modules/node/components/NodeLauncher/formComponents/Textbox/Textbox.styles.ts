import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  input: (theme: ITheme) => css`
    background: transparent;
    border: 1px solid ${theme.colorBorder};
    outline: none;
    color: ${theme.colorText};
    height: 44px;
    min-width: 40 0px;
    border-radius: 6px;
    padding: 0 16px;
    margin-bottom: 20px;

    :focus,
    :active {
      border-color: rgba(255, 255, 255, 0.7);
    }

    @media ${breakpoints.toMed} {
      min-width: 100%;
    }

    @media ${breakpoints.fromXLrg} {
      min-width: 100%;
    }
  `,
  inputRequired: (theme: ITheme) => css`
    border-color: ${theme.colorDanger};
  `,
};
