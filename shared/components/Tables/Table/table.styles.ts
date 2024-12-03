import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: (isResizable?: boolean) => css`
    position: relative;
    ${!isResizable && `width: 100%;`}

    @media ${breakpoints.toXlrg} {
      overflow: auto;
    }

    ${isResizable &&
    `@media ${breakpoints.fromXLrg} {
      overflow-x: auto;
      overflow-y: hidden;
    }`}
  `,
  fixedRowHeight: (rowHeight: string) => css`
    tbody td {
      padding: 0 20px 0 0;
    }

    tbody tr {
      height: ${rowHeight};
    }
  `,
  table: (isResizable?: boolean) => (theme: ITheme) =>
    css`
      width: ${isResizable ? 'fit-content' : '100%'};
      border-collapse: collapse;
      ${isResizable && `table-layout: fixed;`}

      @media ${breakpoints.fromXLrg} {
        .show-on-hover {
          opacity: 0;
          transition: opacity 0.3s;
        }

        tr:hover .show-on-hover {
          opacity: 1;
        }

        tr:hover {
          opacity: 1;
        }
      }

      & tbody tr {
        ::after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 100%;
          height: 1px;
          transform: scaleX(0);
          opacity: 0;
          background: linear-gradient(
            90deg,
            ${rgba(theme.colorText || '#fff', 0)},
            ${theme.colorText},
            ${rgba(theme.colorText || '#fff', 0)}
          );
          transition: 0.4s;
        }

        &:hover {
          ::after {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      }

      tr path {
        transition: 0.3s;
      }

      & tbody tr {
        position: relative;
        border-bottom: 1px solid ${theme.colorBorder};
        opacity: 0.8;
        transition: 0.3s;

        &.active {
          opacity: 1;
        }
      }
    `,
  tableDynamic: (theme: ITheme) => css`
    th {
      padding: 0;
      cursor: pointer;
      border-bottom: 1px solid ${theme.colorInputOutline};
      border-radius: 3px 3px 0 0;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: ${theme.colorOverlay};
      }

      > div:first-of-type {
        display: inline-flex;
        padding: 5px;

        > span {
          line-height: 24px;
        }
      }
    }

    tbody {
      td {
        padding: 7px 5px;
      }
    }
  `,
  tableSkeleton: css`
    display: grid;
    gap: 20px;
  `,
  tableHoverIcon: (theme: ITheme) => css`
    @media ${breakpoints.fromXLrg} {
      tr:hover td:first-of-type .has-hover-color {
        path {
          fill: ${theme.colorPrimary};
        }
      }
    }
  `,
  rowFancyUnderlineHover: css`
    @media ${breakpoints.fromXLrg} {
      cursor: pointer;
      :hover .underline {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  `,
  rowBasicUnderlineHover: (theme: ITheme) => css`
    @media ${breakpoints.fromXLrg} {
      cursor: pointer;
      :hover {
        border-bottom-color: ${theme.colorLabel};
      }
    }
  `,
  tableBackdrop: css`
    position: relative;

    ::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .table-resize {
      pointer-events: none;
    }
  `,
};
