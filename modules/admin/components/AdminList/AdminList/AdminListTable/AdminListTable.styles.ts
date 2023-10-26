import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    overflow: auto;
    flex: 1 1 auto;
    min-width: 0;
    max-width: 100%;
    padding-top: 16px;
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
      padding: 0 0 20px;
    }

    tbody tr td {
      opacity: 0.8;
      padding: 20px 10px 21px 0;
      border-bottom: 1px solid ${theme.colorBorder};
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
  `,
  tableCellWidth: (width: string) => css`
    width: ${width};
    min-width: ${width};
    max-width: ${width};
  `,
};
