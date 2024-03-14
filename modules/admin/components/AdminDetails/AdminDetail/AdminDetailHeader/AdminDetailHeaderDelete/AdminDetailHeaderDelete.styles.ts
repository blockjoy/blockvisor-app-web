import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;

    @media ${breakpoints.toLrg} {
      display: none;
    }
  `,
  text: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    font-size: 14px;
    margin: 0 6px 0 10px;
  `,
  button: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    height: 40px;
    width: 50px;
    font-size: 14px;
    border-radius: 4px;
    border: 0;
    background: ${theme.colorInput};
    color: ${theme.colorText};
    opacity: 0.8;
    cursor: pointer;
    transition: 0.3s;

    :is(:hover, :active. :focus):not(:disabled) {
      opacity: 1;
      box-shadow: 0px 0px 0px 2px ${theme.colorInputOutline};
    }

    :disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `,
  buttonLoading: css`
    cursor: not-allowed;
  `,
};
