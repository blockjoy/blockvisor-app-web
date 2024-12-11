import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    gap: 10px;
    margin-bottom: 24px;
  `,
  rule: (theme: ITheme) => css`
    border-radius: 6px;
    border: 1px solid ${theme.colorBorder};
    padding: 12px 10px;
    margin-bottom: 10px;
  `,
  tabs: (theme: ITheme) => css`
    button {
      background: transparent;
      border: 0;
      padding: 0;
      color: ${theme.colorText};
    }
  `,
  addButton: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 0;
    padding: 8px 0;
    font-size: 14px;
    color: ${theme.colorText};
    opacity: 0.7;
    cursor: pointer;
    transition: 0.3s;

    svg path {
      fill: ${theme.colorText};
    }

    :hover {
      opacity: 1;
    }
  `,
};
