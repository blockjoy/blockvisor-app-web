import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  tableWrapper: css`
    overflow: auto;
    flex: 1 1 auto;
    min-width: 0;
    max-width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: rgb(255 255 255 / 10%);
    }

    ::-webkit-scrollbar-thumb:hover {
      background: rgb(255 255 255 / 20%);
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
  bottomRow: css`
    display: flex;
    align-items: center;
    gap: 20px;

    @media ${breakpoints.toSml} {
      flex-direction: column;
      margin-top: 10px;
    }
  `,
};
