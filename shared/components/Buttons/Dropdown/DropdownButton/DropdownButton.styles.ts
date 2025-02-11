import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 6px;
    border: 1px solid ${theme.colorBorder};
    width: 100%;
    height: 44px;
    line-height: 1.6;
    padding: 0 10px;
    background: transparent;
    cursor: pointer;
    opacity: 0.8;

    :disabled {
      cursor: not-allowed;
      user-select: none;
      -webkit-text-fill-color: var(--color-text-3);
    }

    &,
    p,
    path {
      transition: 0.2s;
    }

    svg path {
      fill: ${theme.colorDefault};
    }

    p {
      color: ${theme.colorText};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 20px;
    }

    :not(:disabled):is(:focus, :hover) {
      svg path {
        fill: ${theme.colorText};
      }

      p {
        color: ${theme.colorText};
      }

      opacity: 1;
      border-color: ${theme.colorLabel};
    }
  `,
  buttonInput: (theme: ITheme) => css`
    background-color: ${theme.colorInput};
    border-color: var(--color-text-5-o10) !important;
    color: var(--color-text-5);

    &:focus {
      outline: 0;
      border-color: var(--color-text-5-o30) !important;
      color: var(--color-text-5);
    }
  `,
  icon: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    right: 10px;
    height: 12px;
    width: 12px;
    translate: 0 -50%;
    pointer-events: none;
    transition: 0.3s;

    path {
      fill: ${theme.colorLabel};
    }
  `,
  iconOpen: css`
    transform: rotate(-180deg);
  `,
  loading: (theme: ITheme) => css`
    p {
      color: ${theme.colorLabel};
    }
  `,
};
