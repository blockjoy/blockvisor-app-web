import { css } from '@emotion/react';

export const styles = {
  base: css`
    position: sticky;
    z-index: 3;
    top: 0;
    background: var(--color-background);
    padding: 20px 0;

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
