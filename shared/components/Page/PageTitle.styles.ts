import { css } from '@emotion/react';

export const styles = {
  base: css`
    background: var(--color-background);
    padding: 16px 0;

    h1 {
      font-size: 18px;
    }
  `,
  actions: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};
