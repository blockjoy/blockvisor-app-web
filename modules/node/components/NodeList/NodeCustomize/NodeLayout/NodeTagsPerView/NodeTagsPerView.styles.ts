import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: initial;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-top: 5px;
    padding-bottom: 5px;
  `,
  input: (theme: ITheme) => css`
    max-width: 38px;
    background: transparent;
    text-align: right;
    border: 1px solid ${theme.colorBorderGrey};
    border-radius: 4px;
    height: 26px;
    min-width: 0;
    padding: 0 8px;
    font-size: 16px;
    outline: none;
    color: ${theme.colorText};
    transition: 0.3s;

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    :focus {
      border-color: ${theme.colorDefault};
    }

    :hover:focus + .tooltip {
      opacity: 1;
      visibility: visible;
      top: -30px;
      left: initial;
      right: 0;
      translate: 0;
    }
  `,
  label: css`
    font-size: 14px;
    cursor: pointer;
  `,
};
