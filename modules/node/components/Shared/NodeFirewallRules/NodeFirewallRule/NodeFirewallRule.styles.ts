import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  rule: (theme: ITheme) => css`
    border-radius: 6px;
    border: 1px solid ${theme.colorBorder};
    margin-bottom: 16px;
  `,
  tabs: (theme: ITheme) => css`
    margin: 0 0 10px;
    padding-left: 10px;
    display: flex;
    gap: 6px;
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  tabButton: (isActive: boolean) => (theme: ITheme) =>
    css`
      background: transparent;
      border: 0;
      padding: 10px 4px;
      font-size: 14px;
      color: ${theme.colorLabel};
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: border-color 0.3s;

      ${isActive &&
      css`
        border-bottom-color: ${theme.colorDefault};
        color: ${theme.colorText};
      `}

      ${!isActive &&
      css`
        :hover {
          border-bottom-color: ${theme.colorBorderGrey};
        }
      `}
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
  configWrapper: css`
    margin-left: auto;
  `,
  tableWrapper: css``,
};
