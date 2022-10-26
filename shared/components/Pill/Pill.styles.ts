import { css } from '@emotion/react';

export const styles = {
  pill: css`
    max-width: 20ch;
    color: var(--color-text-4);
    background-color: var(--color-text-5-o10);
    border-radius: 4px;
    padding: 4px 16px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  `,
  pillFull: css`
    max-width: unset;
  `,
  pillText: css`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
  `,
  pillTextWithAction: css`
    max-width: calc(100% - 20px);
  `,
  pillButton: css`
    flex-basis: 12px;
    color: var(--color-border-4);
    opacity: 0.3;

    & path {
      transition: opacity 0.18s var(--transition-easing-cubic);
    }

    &:hover,
    &:active {
      opacity: 1;
    }
  `,
};
