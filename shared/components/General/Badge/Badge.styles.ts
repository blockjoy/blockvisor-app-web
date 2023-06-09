import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  badge: (theme: ITheme) => css`
    display: inline-flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    height: 18px;
    min-width: 0;
    padding: 0 8px;
    border-radius: 9px;
    font-size: 10px;
    font-weight: 600;
    cursor: default;
    line-height: 1;
  `,
  default: (theme: ITheme) => css`
    color: ${theme.colorTextGrey};
    border-color: ${theme.colorTextGrey};
  `,
  primary: (theme: ITheme) => css`
    color: ${theme.colorPrimary};
    border-color: ${theme.colorPrimary};
  `,
  secondary: (theme: ITheme) => css`
    color: ${theme.colorAccent};
    border-color: ${theme.colorAccent};
  `,
  note: (theme: ITheme) => css`
    color: ${theme.colorNote};
    background: ${theme.colorBackground};
    border-color: ${theme.colorNote};
  `,
  danger: (theme: ITheme) => css`
    color: ${theme.colorText};
    background: ${theme.colorDanger};
    border-color: ${theme.colorDanger};
  `,
  outline: css`
    background: transparent;
    border-width: 1px;
    border-style: solid;
  `,
};
