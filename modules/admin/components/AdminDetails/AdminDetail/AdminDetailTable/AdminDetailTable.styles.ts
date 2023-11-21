import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  table: (theme: ITheme) => css`
    margin: 0 0 60px;

    tr:hover .copy-button {
      opacity: 1;
      visibility: visible;
    }

    th,
    td {
      padding: 16px 10px 16px 0;
      border-bottom: 1px solid ${theme.colorBorder};
      vertical-align: middle;
    }

    th {
      color: ${theme.colorDefault};
      font-weight: 400;
      text-align: left;
      width: 200px;
      max-width: 200px;
      font-size: 14px;
    }

    th,
    p {
      line-height: 1.66;
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
        height: 68px;
      }
    }
  `,
  copyButton: css`
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;

    @media ${breakpoints.toXlrg} {
      opacity: 1;
      visibility: visible;
    }

    @media ${breakpoints.toSml} {
      display: none;
    }
  `,
};
