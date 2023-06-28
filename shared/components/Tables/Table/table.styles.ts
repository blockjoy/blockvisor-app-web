import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    position: relative;
    width: 100%;
    @media ${breakpoints.toXlrg} {
      overflow: auto;
    }
  `,
  fixedRowHeight: (rowHeight: string) => css`
    tbody td {
      padding: 0 20px 0 0;
    }

    tbody tr {
      height: ${rowHeight};
    }
  `,
  textAlign: (textAlign: string) => css`
    text-align: ${textAlign};
  `,
  table: (theme: ITheme) => css`
    width: 100%;
    border-collapse: collapse;

    & th {
      padding: 0 0 10px;
      color: ${theme.colorDefault};
      letter-spacing: 1px;
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      cursor: default;
      white-space: nowrap;

      @media ${breakpoints.toXlrg} {
        padding: 0 16px 10px 0;
      }
    }

    & .show-on-hover {
      opacity: 0;
      transition: opacity 0.3s;
    }

    tr:hover .show-on-hover {
      opacity: 1;
    }

    tr:hover {
      opacity: 1;
    }

    tr path {
      transition: 0.3s;
    }

    & td {
      padding: 20px 20px 20px 0;

      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.6;
      }

      @media ${breakpoints.toXlrg} {
        padding: 20px 16px 20px 0;
      }
    }

    td:last-of-type {
      padding-right: 10px;
    }

    & tbody tr {
      position: relative;
      border-bottom: 1px solid ${theme.colorBorder};
      opacity: 0.8;
      transition: 0.3s;
    }
  `,
  rowFancyUnderlineHover: css`
    @media ${breakpoints.fromXLrg} {
      :hover .underline {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  `,
  rowBasicUnderlineHover: (theme: ITheme) => css`
    @media ${breakpoints.fromXLrg} {
      :hover {
        border-bottom-color: ${theme.colorLabel};
      }
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
  `,
  hiddenOnMobile: (theme: ITheme) => css`
    @media only screen and (max-width: ${theme.screenSm}) {
      display: none;
    }
  `,
  top: css`
    vertical-align: top;
  `,
  middle: css`
    vertical-align: middle;
  `,
};
