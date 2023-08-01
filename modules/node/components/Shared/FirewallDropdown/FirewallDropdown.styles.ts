import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    flex: 1 1 auto;
    min-width: 0;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 16px;

    :hover,
    &.not-empty,
    &.is-open {
      svg path {
        fill: ${theme.colorText};
      }

      p {
        color: ${theme.colorText};
      }

      > button {
        border-color: ${theme.colorDefault};
      }
    }

    &.not-empty {
      span {
        color: ${theme.colorDefault};
      }
      p {
        color: ${theme.colorText};
      }
    }
  `,
  dropdown: css`
    top: 54px;
    right: 5px;
    left: 0;
    width: 100%;
    min-width: 100%;
    padding: 0 10px 10px;
  `,
  button: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 6px;
    border: 1px solid ${theme.colorBorder};
    width: 100%;
    height: 44px;
    padding: 0 10px;
    background: transparent;
    cursor: pointer;

    &,
    p,
    path {
      transition: 0.2s;
    }

    svg path {
      fill: ${theme.colorDefault};
    }

    p {
      color: ${theme.colorDefault};
    }
  `,
  dropdownlabel: (theme: ITheme) => css`
    color: ${theme.colorDefault};
  `,
  text: (theme: ITheme) => css`
    min-width: 0;
    color: ${theme.colorText};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 50px;
  `,
  separator: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    margin: 0 10px;
  `,
  icon: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    right: 10px;
    translate: 0 -50%;
    rotate: 90deg;
    pointer-events: none;
    transition: 0.3s;

    path {
      fill: ${theme.colorDefault};
    }
  `,
  iconOpen: css`
    transform: rotate(-180deg);
  `,
};
