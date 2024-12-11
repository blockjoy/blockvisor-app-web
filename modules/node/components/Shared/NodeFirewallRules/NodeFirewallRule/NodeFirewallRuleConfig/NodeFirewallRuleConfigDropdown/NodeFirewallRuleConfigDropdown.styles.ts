import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  menu: css`
    top: 32px;
    right: -2px;
    left: -2px;
  `,
  scrollbar: css``,
  dropdownButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    color: ${theme.colorText};
    font-size: 14px;
    cursor: pointer;
    height: 36px;
    display: flex;
    gap: 6px;
    padding: 0 10px;
    align-items: center;
  `,
};
