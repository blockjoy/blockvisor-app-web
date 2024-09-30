import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  tag: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    background: ${theme.colorBorderGrey};
    padding: 0 0 0 12px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    text-transform: capitalize;
  `,
  removeButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    padding: 0 10px 0 6px;
    height: 100%;
    cursor: pointer;

    :hover svg > path {
      fill: ${theme.colorText};
    }
  `,
};
