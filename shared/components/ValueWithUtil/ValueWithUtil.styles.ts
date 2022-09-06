import { css } from '@emotion/react';

export const styles = {
  base: css`
    color: var(--color-text-5);
    background-color: var(--color-text-5-o3);
    display: flex;
    flex-direction: column;
    gap: 32px;
    border-radius: 4px;
    padding: 15px 16px;

    @media (--screen-medium-small) {
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
  `,
};
