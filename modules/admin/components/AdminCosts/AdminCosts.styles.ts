import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    width: 100%;
  `,
  h2: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    font-size: 16px;
    margin-bottom: 20px;
  `,
  tableWrapper: css`
    overflow: auto;
    width: 100%;
  `,
  table: (theme: ITheme) => css`
    text-align: left;
    width: 100%;

    thead {
      position: sticky;
      top: 0;
    }

    thead th {
      color: ${theme.colorLabel};
      font-weight: 400;
    }

    thead th,
    tbody td {
      padding: 16px 0;
      border-bottom: 1px solid ${theme.colorBorder};
      vertical-align: top;
    }

    tbody td {
      padding: 16px 32px 16px 0;
    }
  `,
  message: css`
    white-space: pre;
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    max-width: 500px;
    max-height: 50px;
    line-height: 1.7;
  `,
};
