import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: relative;
    padding: 14px 16px;
    background: ${theme.colorInput};
    border-radius: 6px;
    border: 1px solid ${theme.colorInput};
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${theme.colorText};

    @media ${breakpoints.fromXLrg} {
      width: 100%;
    }

    :disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &,
    path {
      transition: 0.3s;
    }

    path {
      color: ${theme.colorLabel};
    }

    :not(:disabled):is(:hover, :active) {
      border-color: ${theme.colorBorderGrey};

      path {
        color: ${theme.colorText};
      }
    }
  `,
  value: (theme: ITheme) => css`
    padding: 5px 10px;
    font-size: 14px;
    border: none;
    outline: none;
    background-color: ${theme.colorInput};
    margin-right: auto;
  `,
};
