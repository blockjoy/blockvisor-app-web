import { css } from '@emotion/react';

export const styles = {
  controls: css`
    display: flex;
    flex-wrap: wrap;
    gap: 28px;

    & > :global(*) {
      flex-basis: calc(33% - 28px);
      min-width: 178px;
      max-width: 200px;
    }
  `,
  label: css`
    color: var(--color-text-4);
    margin-bottom: 20px;
  `,
};
