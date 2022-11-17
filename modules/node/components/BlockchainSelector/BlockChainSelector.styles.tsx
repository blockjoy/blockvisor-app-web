import { css } from '@emotion/react';

export const styles = {
  inputWrapper: css`
    padding: 5px 16px;
    border-bottom: 1px solid var(--color-text-5-o10);
  `,
  searchInput: css`
    background-color: var(--color-overlay-background-1);
    border: 1px solid var(--color-overlay-background-1);
    transition: border-color 1s ease;

    &:focus,
    &:hover {
      outline: 0;
      border-color: var(--color-overlay-background-1);
    }
  `,
};
