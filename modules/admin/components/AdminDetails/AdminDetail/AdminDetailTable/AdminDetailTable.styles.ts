import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  table: (theme: ITheme) => css`
    margin: 0 0 60px;
    border-collapse: collapse;

    tr:hover .copy-button {
      opacity: 1;
      visibility: visible;
    }

    tr {
      border-bottom: 1px solid ${theme.colorBorder};
    }

    th,
    td {
      padding: 20px 10px 20px 0;
    }

    th {
      color: ${theme.colorDefault};
      font-weight: 400;
      text-align: left;
      width: 200px;
      max-width: 200px;
      font-size: 14px;
      vertical-align: top;
    }

    td {
      vertical-align: middle;
      word-break: break-all;
      line-height: 1.6;
    }

    th,
    p {
      line-height: 30px;
    }

    p {
      margin: 0;
    }

    @media ${breakpoints.toSml} {
      tr {
        display: flex;
        flex-direction: column;
      }

      th {
        border: 0;
        min-height: auto;
        height: 30px;
        width: 100%;
        max-width: 100%;
        padding: 10px 0 5px;
      }

      td {
        padding-bottom: 20px;
      }
    }

    @media ${breakpoints.fromMed} {
      td {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }

      th,
      td {
        min-height: 68px;
      }
    }
  `,
  copyButton: css`
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;

    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
};
