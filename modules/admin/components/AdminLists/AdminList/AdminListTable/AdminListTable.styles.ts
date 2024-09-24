import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  tableWrapper: (theme: ITheme) => css`
    position: relative;
    overflow: auto;
    flex: 1 1 auto;
    border-left: 1px solid ${theme.colorBorder};
    border-right: 1px solid ${theme.colorBorder};
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromSml} {
      max-height: calc(100vh - 230px);
      margin-bottom: 10px;
    }

    @media ${breakpoints.toSml} {
      max-height: calc(100dvh - 230px);
    }

    *::-webkit-scrollbar,
    *::-webkit-scrollbar-track {
      border-radius: 8px;
    }

    ::-webkit-scrollbar {
      width: 8px;
      padding-right: 8px;
    }

    ::-webkit-scrollbar-corner {
      background: transparent;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: rgb(255 255 255 / 10%);
    }

    ::-webkit-scrollbar-thumb:hover {
      background: rgb(255 255 255 / 20%);
      cursor: pointer;
    }
  `,
  table: (isScrolledDown: boolean) => (theme: ITheme) =>
    css`
      text-align: left;
      width: 100%;
      min-width: 500px;
      font-size: 13px;
      margin-bottom: px;
      border-collapse: collapse;

      th {
        color: ${rgba(theme.colorDefault || '#a7a7a7', 0.8)};
        font-weight: 400;
      }

      th > span {
        min-height: 36px;
        white-space: nowrap;
      }

      thead {
        position: sticky;
        z-index: 1;
        top: 0;
        background: ${theme.colorBackground};
        transition: 0.3s;

        ${isScrolledDown &&
        css`
          box-shadow: 0 10px 40px ${rgba(theme.colorBackground || '#000', 1)};
        `};

        ::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          height: 1px;
          background: ${theme.colorBorder};
        }
      }

      thead tr th,
      tbody tr td {
        border: 1px solid ${theme.colorBorder};
        padding: 0 10px;
      }

      thead tr th:first-child,
      tbody tr td:first-child {
        border-left: 0;
      }

      thead tr th {
        border-bottom: 0;
        border-top: 0;
      }

      tbody tr:first-child td {
        border-top: 0;
      }

      tbody tr:last-child td {
        border-bottom: 0;
      }

      tbody tr td {
        vertical-align: middle;
        opacity: 0.8;
        height: 48px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      tbody tr {
        cursor: pointer;
      }

      tbody tr:hover td {
        opacity: 1;
        background: rgb(255 255 255 / 2%);
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
    box-sizing: border-box;
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
  emptyMessage: (theme: ITheme) => css`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 24px 16px;
    font-size: 14px;
    margin: 0;
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  bottomRow: (theme: ITheme) => css`
    display: flex;

    @media ${breakpoints.fromSml} {
      position: sticky;
      bottom: 0;
      height: 60px;
      background: ${theme.colorBackground};
    }

    @media ${breakpoints.toSml} {
      flex-direction: column;
    }
  `,
  paginationWrapper: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 20px;
    height: 56px;

    @media ${breakpoints.toSml} {
      transform: scale(0.875);
      justify-content: center;
    }
  `,
  checkboxButton: css`
    background: transparent;
    border: 0;
    display: grid;
    place-items: center;
    height: 48px;
    width: 50px;
    cursor: pointer;

    :disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
};
