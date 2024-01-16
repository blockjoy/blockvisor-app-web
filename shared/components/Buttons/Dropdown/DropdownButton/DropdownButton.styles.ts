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
    padding: 0 10px;
    background: transparent;
    cursor: pointer;
    opacity: 0.8;

    :disabled {
      cursor: not-allowed;
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

    :focus {
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
