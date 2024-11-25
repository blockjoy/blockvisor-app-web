import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  switchLabel: css`
    grid-template-columns: auto auto !important;
    gap: initial;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
  `,
  switchLabelContent: css`
    pointer-events: none;
    user-select: none;
  `,
  list: (theme: ITheme) => css`
    li {
      padding-left: 9px;
      padding-right: 10px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;

      :hover {
        background-color: ${theme.colorBorder};
      }
    }
  `,
  title: (theme: ITheme) => css`
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 12px;
    color: ${theme.colorDefault};
  `,
};
