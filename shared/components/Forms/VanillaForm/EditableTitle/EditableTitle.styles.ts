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
    min-height: 50px;
    min-width: 0;
    color: ${theme.colorText};
    -webkit-text-fill-color: ${theme.colorText};
    opacity: 1; /* required on iOS */
    border: 0;
    padding: 0;
    border-radius: 0;
    border-bottom: 1px solid transparent;
    resize: none;

    :disabled {
      -webkit-text-fill-color: ${theme.colorText};
      opacity: 1; /* required on iOS */
    }
  `,
  inputEditable: (theme: ITheme) => css`
    border-color: ${theme.colorBorder};
  `,
  iconWrapper: css`
    width: 24px;
    height: 24px;
  `,
  span: (theme: ITheme) => css`
    color: ${theme.colorText};
    font-size: 24px;
    min-height: 50px;
    display: flex;
    align-items: center;
    margin-right: 11px;
    min-width: 0;
    overflow: hidden;
  `,
};
