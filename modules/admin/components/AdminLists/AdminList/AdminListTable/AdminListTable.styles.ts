import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    overflow: auto;
    flex: 1 1 auto;
    min-width: 0;
    max-width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;

    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${theme.colorLabel};
      opacity: 0.5;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.colorDefault};
    }
  `,
  table: (theme: ITheme) => css`
    text-align: left;
    width: 100%;
    min-width: 500px;
    font-size: 13px;
    border-collapse: collapse;

    th {
      color: ${rgba(theme.colorDefault || '#a7a7a7', 0.8)};
      font-weight: 400;
    }

    th,
    td {
      border-bottom: 1px solid ${theme.colorBorder};
    }

    tbody tr td {
      vertical-align: middle;
      opacity: 0.8;
      padding: 0 10px 0 0;
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
  copyTd: css`
    display: flex;
    align-items: center;
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
