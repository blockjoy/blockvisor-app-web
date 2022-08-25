import { css } from '@emotion/react';

const passwordToggle = css`
  color: var(--color-text-2);
  padding-top: 4px;
  transition: color 0.18s var(--transition-easing-cubic);

  &:hover,
  &:active {
    color: var(--color-text-3);
  }
`;

export { passwordToggle };
