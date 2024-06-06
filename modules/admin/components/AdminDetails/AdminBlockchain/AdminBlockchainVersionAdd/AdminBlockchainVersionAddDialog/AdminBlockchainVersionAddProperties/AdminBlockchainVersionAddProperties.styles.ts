import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    min-width: 0;

    > div:last-of-type {
      margin-bottom: 16px;
    }
  `,
  row: (theme: ITheme) => css`
    position: relative;
    border: 1px solid ${theme.colorBorder};
    border-radius: 6px;
    padding: 16px;
    margin-bottom: 24px;
  `,
  formGrid: css`
    display: grid;
    gap: 8px 16px;
    grid-template-columns: 40% 1fr;

    @media ${breakpoints.toLrg} {
      grid-template-columns: 1fr;
      gap: 10px 0;
    }
  `,
  formGridFullWidth: css`
    grid-column: 1 / 3;
    display: flex;
    justify-content: space-between;
  `,
  button: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    color: ${theme.colorText};
    opacity: 0.7;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 14px;
    margin-bottom: 20px;

    svg path {
      fill: ${theme.colorText};
    }

    :hover {
      opacity: 1;
    }
  `,
  deleteButton: (theme: ITheme) => css`
    position: absolute;
    top: -15px;
    right: 16px;
    background: ${theme.colorBackground};
    border: 1px solid ${theme.colorBorder};
    border-radius: 4px;
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    color: ${theme.colorText};
    cursor: pointer;
    transition: 0.3s;

    svg path {
      fill: ${theme.colorDefault};
      transition: 0.3s;
    }

    :hover {
      border-color: ${theme.colorLabel};
    }

    :hover svg path {
      fill: ${theme.colorText};
    }
  `,
  textbox: (theme: ITheme) => css`
    background: transparent;
    color: ${theme.colorText};
    width: 100%;
    height: 40px;
    padding: 0;
    border: 0;
    border-bottom: 1px solid ${theme.colorBorder};
    outline: none;
    margin-bottom: 16px;

    :focus {
      border-bottom-color: red;
    }
  `,
};
