import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (hasItems: boolean) => (theme: ITheme) =>
    css`
      ${hasItems &&
      css`
        border-top: 1px solid ${theme.colorBorder};
        padding-top: 16px;
        margin-top: 10px;
      `}
    `,
  row: (theme: ITheme) => css`
    border-bottom: 1px solid ${theme.colorBorder};
    margin-bottom: 16px;
  `,
  addButton: (theme: ITheme) => css`
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
};
