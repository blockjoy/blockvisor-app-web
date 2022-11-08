import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  listTypePicker: css`
    display: flex;
  `,
  total: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    text-align: center;
    font-size: 13px;
    white-space: nowrap;
  `,
  totalValue: (theme: ITheme) => css`
    color: ${theme.colorText};
  `,
  iconButton: (theme: ITheme) => css`
    display: block;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0 4px;

    & path {
      fill: ${theme.colorLabel};
    }
  `,
  iconButtonActive: (theme: ITheme) => css`
    & path {
      fill: ${theme.colorText};
    }
  `,
};
