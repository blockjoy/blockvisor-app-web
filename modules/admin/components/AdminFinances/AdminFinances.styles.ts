import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    width: 100%;
    padding-top: 8px;
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
      vertical-align: middle;
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
  sortButton: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: ${theme.colorDefault};
    border: 0;
    padding: 0;
    cursor: pointer;
    text-transform: capitalize;

    :hover {
      color: ${theme.colorText};
    }
  `,
  sortButtonSelected: (theme: ITheme) => css`
    opacity: 0.85;

    color: ${theme.colorText};

    svg path {
      fill: ${theme.colorText};
    }

    :hover {
      opacity: 1;
    }
  `,
  editControl: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    color: ${theme.colorText};
    height: 40px;
    width: 100%;
    outline-style: solid;
    outline-color: transparent;
    border-radius: 6px;
    padding-left: 4px;

    :focus {
      outline-style: solid;
      outline-width: 2px;
      outline-color: ${theme.colorPrimary};
    }
  `,
};
