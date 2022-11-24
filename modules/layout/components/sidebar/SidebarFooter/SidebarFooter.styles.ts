import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    color: var(--color-text-5);
    padding: 16px 60px 16px 20px;
  `,
  copy: css`
    padding-top: 20px;
  `,
  support: css`
    display: flex;
    align-items: center;
    gap: 8px;
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
