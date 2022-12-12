import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { rgba } from 'polished';

export const tableStyles = {
  wrapper: css`
    position: relative;
    width: 100%;
    margin-top: 24px;
  `,
  table: (theme: ITheme) => css`
    width: 100%;

    & th {
      padding: 0 0 10px;
      color: ${theme.colorDefault};
      letter-spacing: 1px;
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      text-align: left;
      cursor: default;
    }

    @media only screen and (max-width: ${theme.screenSm}) {
      & tr th:last-of-type,
      & tr td:last-of-type {
        text-align: right;
      }

      .hidden-on-mobile {
        display: none;
      }
    }

    & .show-on-hover {
      opacity: 0;
      transition: opacity 0.3s;
    }

    tr:hover .show-on-hover {
      opacity: 1;
    }

    & .has-hover-color {
      transition: color 0.3s;
    }

    & td {
      padding: 20px 0;
      vertical-align: top;
    }

    & tr:hover .has-hover-color {
      color: ${theme.colorPrimary};
    }

    & tbody tr {
      position: relative;
    }

    & tbody tr td {
      border-bottom: 1px solid ${theme.colorBorder};
    }

    & .danger span,
    & tr:hover.danger .has-hover-color {
      color: ${theme.colorDanger};
    }

    /* & td:first-of-type::after {
      content: '';
      
    } */

    tr:hover .underline {
      transform: scaleX(1);
      opacity: 1;
    }
  `,
  tableSkeleton: css`
    display: grid;
    gap: 20px;
  `,
  hasHoverRows: css`
    tbody tr:hover {
      cursor: pointer;
    }
  `,
  underline: (theme: ITheme) => css`
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    opacity: 0;
    background: linear-gradient(
      90deg,
      ${rgba(theme.colorPrimary || '#000', 0)},
      ${theme.colorPrimary},
      ${rgba(theme.colorPrimary || '#000', 0)}
    );
    transition: 0.4s;
  `,
};
