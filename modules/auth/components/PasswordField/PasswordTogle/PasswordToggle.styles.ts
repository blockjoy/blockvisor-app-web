import { css } from '@emotion/react';

const passwordToggle = css`
  & > svg {
    path {
      fill: var(--color-text-2);
      padding-top: 4px;
      transition: fill 0.18s var(--transition-easing-cubic);
    }
  }

  &:hover,
  &:active {
    & > svg {
      path {
        fill: var(--color-text-3);
      }
    }
  }
`;

export { passwordToggle };
