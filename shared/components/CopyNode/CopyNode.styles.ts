import { css } from '@emotion/react';

export const styles = {
  base: css`
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--color-text-5-o10);

    &:hover {
      color: var(--color-text-3);
    }

    &:active {
      color: var(--color-text-5);
    }
  `,
};
