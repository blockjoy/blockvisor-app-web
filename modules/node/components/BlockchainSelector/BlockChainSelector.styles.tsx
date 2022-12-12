import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  inputWrapper: css`
    padding: 5px 16px;
    border-bottom: 1px solid var(--color-text-5-o10);
  `,

  closeWrapper: css`
    display: flex;
    justify-content: flex-end;
    padding: 0px 8px;

    @media ${breakpoints.fromMed} {
      display: none;
    }
  `,
  closeButton: css`
    cursor: pointer;
    background-color: transparent;
    border-width: 0;
    padding: 16px;

    & > svg {
      path {
        fill: var(--color-text-5);
      }
    }
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
