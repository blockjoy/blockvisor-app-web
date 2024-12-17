import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  title: (theme: ITheme) => css`
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    color: ${theme.colorDefault};
  `,
  list: (theme: ITheme) => css`
    > div {
      position: relative;
      padding-left: 9px;
      padding-right: 10px;
      border-radius: 8px;
      cursor: pointer;

      :hover {
        background-color: ${theme.colorBorder};
      }
    }
  `,
};
