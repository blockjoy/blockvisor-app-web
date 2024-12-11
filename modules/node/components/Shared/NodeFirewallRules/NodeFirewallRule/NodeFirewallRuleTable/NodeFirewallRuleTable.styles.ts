import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  table: (theme: ITheme) => css`
    width: 100%;
    border-collapse: collapse;

    thead th {
      padding: 0 0 10px 10px;
      height: 30px;
    }

    thead tr th:last-of-type {
      padding-right: 10px;
    }

    tbody td {
      padding: 10px 16px;
      font-size: 14px;
    }

    tbody tr td:last-of-type {
      text-align: right;
      padding-right: 6px;
    }

    tbody tr {
      border-top: 1px solid ${theme.colorBorder};
    }

    tbody tr:hover .delete-button {
      @media ${breakpoints.fromXLrg} {
        opacity: 1;
        visibility: visible;
      }
    }

    thead tr th:last-child,
    tbody tr td:last-child {
      text-align: right;
    }
  `,
  inputInvalid: (theme: ITheme) => css`
    &,
    :focus {
      border-color: ${theme.colorDanger};
    }
  `,
  input: (theme: ITheme) => css`
    background: transparent;
    border-radius: 4px;
    border: 1px solid ${theme.colorBorder};
    padding: 0 6px;
    height: 32px;
    color: ${theme.colorText};
    outline: none;
    min-width: 0;
    width: 100%;

    :focus {
      border-color: ${theme.colorBorderGrey};
    }

    ::placeholder {
      text-transform: capitalize;
    }

    @media ${breakpoints.fromXLrg} {
      font-size: 14px;
    }
  `,
  addRowButton: (theme: ITheme) => css`
    background: ${theme.colorInput};
    height: 32px;
    width: 100%;
    color: ${theme.colorText};
    padding: 0 12px;
    border: 0;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 400;
    cursor: pointer;

    :disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `,
  deleteRowButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    width: 30px;
    margin-left: auto;
    display: inline-grid;
    place-items: center;
    cursor: pointer;
    transition: 0.3s;

    @media ${breakpoints.fromXLrg} {
      opacity: 0;
      visibility: hidden;
    }

    svg path {
      fill: ${theme.colorDefault};
    }

    :hover svg path {
      fill: ${theme.colorText};
    }
  `,
};
