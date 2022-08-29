import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    text-transform: uppercase;
    transition: color 0.25s var(--transition-easing-cubic);
    grid-gap: 12px;
    flex-wrap: wrap;
    display: grid;
    user-select: none;

    @media ${breakpoints.toLrg} {
      text-align: center;
    }

    @media ${breakpoints.fromLrg} {
      align-items: center;
      grid-template-columns: 40px auto;
    }
  `,
  number: css`
    margin: 0 auto;
    width: 40px;
    aspect-ratio: 1;
    border-radius: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: currentColor;
    border: 1px solid currentColor;
  `,
  content: css`
    @media ${breakpoints.toLrg} {
      flex-basis: 100%;
    }
  `,
  disabled: css`
    color: var(--color-text-2);
    cursor: not-allowed;
  `,
  current: css`
    color: var(--color-text-4);
    cursor: not-allowed;
  `,
  completed: css`
    color: var(--color-primary);
  `,
};
