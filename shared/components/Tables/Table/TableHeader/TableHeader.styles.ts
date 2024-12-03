import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  header: (theme: ITheme) => css`
    padding: 0 0 10px;
    color: ${theme.colorDefault};
    letter-spacing: 1px;
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    cursor: default;
    white-space: nowrap;
    padding-right: 20px;
    user-select: none;

    @media ${breakpoints.toXlrg} {
      padding: 0 16px 10px 0;
    }

    &.active {
      background-color: ${theme.colorOverlay};
    }

    &:hover,
    &.active {
      color: ${theme.colorText};

      .table-sort,
      .table-move {
        opacity: 1;
      }

      & svg path {
        fill: ${theme.colorText};
      }
    }
  `,
  headerWrapper: css`
    width: 100%;
  `,
  button: (theme: ITheme) => css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0;
    border: 0;
    background: transparent;
    letter-spacing: inherit;
    text-transform: inherit;
    color: inherit;
    cursor: pointer;
    position: relative;
    padding: 7px;
    border-radius: 6px;
    margin-left: 5px;
    opacity: 0;

    &,
    svg path {
      transition: 0.3s;
    }

    & svg path {
      fill: ${theme.colorLabel};
    }

    &:hover {
      background-color: ${theme.colorBackground};

      path {
        fill: ${theme.colorText};
      }
    }
  `,
  buttonActive: (theme: ITheme) => css`
    color: ${theme.colorText};
    opacity: 1;
  `,
  text: (isSortable?: boolean) => (theme: ITheme) =>
    css`
      position: relative;
      letter-spacing: inherit;
      text-transform: inherit;
      color: inherit;
      line-height: 1;
      ${isSortable && 'cursor: pointer;'}

      :hover {
        + button {
          background-color: ${theme.colorBorder};

          path {
            fill: ${theme.colorText};
          }
        }
      }
    `,
  icon: (isAscending: boolean) => (theme: ITheme) =>
    css`
      svg :is(path, circle, rect) {
        fill: ${theme.colorText};
      }
      ${isAscending &&
      `
        transform: rotate(180deg);
      `}
    `,
  resizer: (theme: ITheme) => css`
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    background: ${theme.colorBorderGrey};
    transition-property: opacity, visibility;
    transition-duration: 0.3s;
    cursor: col-resize;
    opacity: 0;
    padding-left: 3px;
    padding-right: 3px;
    transform: translateX(50%);
    border-radius: 3px;

    :hover {
      background-color: ${theme.colorAccent};
      opacity: 1;
    }
  `,
};
