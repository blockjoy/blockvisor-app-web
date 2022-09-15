import { css } from '@emotion/react';

// styling is incomplete due to way selectors are used in the original svelte file

export const styles = {
  base: css`
    cursor: pointer;
    user-select: none;
    display: flex;
    gap: 20px;
    position: relative;

    &::before {
      margin-top: 2px;
      content: '';
      flex: 0 0 32px;
      border: 1px solid var(--color-border-2);
      display: block;
      width: 32px;
      height: 20px;
      border-radius: 24px;
      transition: border-color 0.15s var(--transition-easing-cubic);
    }

    &::after {
      margin-top: 2px;
      content: '';
      flex: 0 0 12px;
      display: block;
      width: 12px;
      top: 0;
      left: 0;
      transform: translate3d(4px, 4px, 0);
      height: 12px;
      border-radius: 12px;
      position: absolute;
      background-color: var(--color-text-5);
      transition: background-color 0.15s var(--transition-easing-cubic),
        transform 0.15s var(--transition-easing-cubic);
    }
  `,
  label: css`
    cursor: auto;
  `,
  description: css`
    display: block;
    color: var(--color-text-3);
  `,
};
