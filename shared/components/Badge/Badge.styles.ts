import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  badge: (theme: ITheme) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 18px;
    min-width: 32px;
    padding: 0 8px;
    border-radius: 9px;
    font-size: 10px;
    font-weight: 600;
    cursor: default;
    line-height: 1;
  `,
  primary: (theme: ITheme) => css`
    background: ${theme.colorDanger};
    color: ${theme.colorBackground};
  `,
  secondary: (theme: ITheme) => css`
    background: ${theme.colorPrimary};
    color: ${theme.colorText};
  `,
  note: (theme: ITheme) => css`
    color: ${theme.colorNote};
    background: ${theme.colorBackground};
  `,
  outline: (theme: ITheme) => css`
    background: transparent;
    border: 1px solid ${theme.colorNote};
  `,
};
