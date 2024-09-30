import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  tableWrapper: (theme: ITheme) => css`
    position: relative;
    overflow: auto;
    flex: 1 1 auto;
    border-bottom: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromSml} {
      max-height: calc(100vh - 220px);
    }

    @media ${breakpoints.toSml} {
      max-height: calc(100dvh - 220px);
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
        height: 54px;
        border-bottom: 1px solid ${theme.colorBorder};
      }

      thead tr th:first-of-type,
      tbody tr td:first-of-type {
        border-left: 0;
      }

      thead tr th {
        border-bottom: 0;
        border-top: 0;
        user-select: none;
      }

      tbody tr:first-of-type td {
        border-top: 0;
      }

      tbody tr:last-of-type td {
        border-bottom: 0;
      }

      tbody tr td {
        vertical-align: middle;
        opacity: 0.7;
        padding: 0 12px 0 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition-property: opacity, border-color;
        transition-duration: 0.3s;
      }

      tbody tr {
        cursor: pointer;
      }

      tbody tr:hover td {
        opacity: 1;
        border-bottom-color: rgb(255 255 255 / 24%);
      }

      tbody tr:hover .copy-button {
        opacity: 1;
        visibility: visible;
      }
    `,
  resizeLine:
    (isResizing: boolean, isTableHeaderHovered: boolean) => (theme: ITheme) =>
      css`
        position: fixed;
        z-index: 2;
        top: 0;
        left: 0;
        bottom: 0;
        width: 2px;
        background: ${theme.colorBorderGrey};
        transition-property: opacity, visibility;
        transition-duration: 0.175s;
        cursor: col-resize;
        pointer-events: none;

        opacity: 0;
        visibility: hidden;

        ${(isTableHeaderHovered || isResizing) &&
        css`
          opacity: 1;
          visibility: visible;
        `}

        :hover {
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
