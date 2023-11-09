import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    overflow: auto;
    flex: 1 1 auto;
    min-width: 0;
    max-width: 100%;
  `,
  table: (theme: ITheme) => css`
    text-align: left;
    width: 100%;
    min-width: 500px;
    font-size: 13px;
    border-collapse: collapse;

    th {
      color: ${theme.colorLabel};
      font-weight: 400;
    }

    tbody tr td {
      opacity: 0.8;
      padding: 0 10px 0 0;
      border-bottom: 1px solid ${theme.colorBorder};
      height: 50px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: 0.3s;
    }

    tbody tr {
      cursor: pointer;
    }

    tbody tr:hover td {
      opacity: 1;
      border-color: ${theme.colorBorderGrey};
    }

    tbody tr:hover .copy-button {
      opacity: 1;
      visibility: visible;
    }
  `,
  tableCellWidth: (width: string) => css`
    width: ${width};
    min-width: ${width};
    max-width: ${width};
  `,
  copyButton: css`
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
  `,
  rowCount: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    font-size: 14px;
    margin-bottom: 14px;
  `,
  rowCountTotal: (theme: ITheme) => css`
    color: ${theme.colorText};
    font-style: normal;
  `,
};
