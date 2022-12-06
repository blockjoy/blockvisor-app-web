import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    color: var(--color-text-5);
  `,
  copy: css``,
  support: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  separator: (theme: ITheme) => css`
    margin: 0 -16px;
    border-top: 1px solid ${theme.colorBorder};
  `,
  logo: css`
    & path {
      fill: #4c4f4d;
    }
  `,
  button: css`
    padding: 16px 16px 16px 0;

    &:hover {
      & > svg {
        path {
          fill: var(--color-text-5);
        }
      }
    }
  `,
  buttonText: css`
    margin-left: 10px;
  `,
  icon: css`
    path {
      transition: fill 0.18s var(--transition-easing-cubic);
      fill: var(--color-text-2);

      &:hover {
        fill: var(--color-text-5);
      }
    }
    cursor: pointer;
  `,
};
