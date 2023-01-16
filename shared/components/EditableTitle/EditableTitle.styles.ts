import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  `,
  input: (theme: ITheme) => css`
    background: transparent;
    font-size: 24px;
    outline: none;
    height: 50px;
    min-width: 0;
    color: ${theme.colorText};
    border: 0;
    border-bottom: 1px solid transparent;
  `,
  inputEditable: (theme: ITheme) => css`
    border-color: ${theme.colorBorder};
  `,
  editToggle: (theme: ITheme) => css`
    flex: 0 0 50px;
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    background: transparent;
    border: 0;
    padding: 16px;
    cursor: pointer;

    path {
      fill: ${theme.colorLabel};
    }

    :hover path {
      fill: ${theme.colorText};
    }
  `,
};
