import { css } from '@emotion/react';

export const styles = {
  base: css`
    color: var(--color-text-4);
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 12px;
    align-items: center;
    min-width: 160px;
    cursor: pointer;

    &,
    &:visited {
      color: var(--color-text-4);
    }

    & :global(svg) {
      color: var(--color-text-5-o20);
      flex-basis: 12px;
      transition: color 0.18s var(--transition-easing-cubic);
      pointer-events: none;
    }

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
      background-color: var(--color-border-2);

      & :global(svg) {
        color: var(--color-text-5);
      }
    }
  `,
  small: css`
    padding: 8px 12px;
  `,
  medium: css`
    padding: 12px;
  `,
  large: css`
    padding: 16px 12px;
  `,
};