import { css } from '@emotion/css';

export const styles = {
  base: css`
    &:focus {
      all: initial;
      cursor: pointer;
      background-color: theme(--color-text-1);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
      padding: 20px;
      color: theme(--color-primary);
      font-family: theme(--font-family-primary);
      border-bottom: 1px solid theme(--color-text-5-o10);
      z-index: var(--level-4);
    }
  `,
};
