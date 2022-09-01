import { css } from '@emotion/css';

export const styles = {
  base: css`
    color: var(--color-text-4);

    & :global(svg) {
      flex-shrink: 0;
    }

    & :global(svg path) {
      fill: currentColor;
    }
  `,
  inactive: css`
    color: var(--color-text-2);
  `,
  active: css`
    color: var(--color-primary);
  `,
  description: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  value: css`
    margin-bottom: 8px;
  `,
  'change-on-zero': css`
    &:global(.stats--zero-value) {
      color: var(--color-text-2);
    }
  `,
};
