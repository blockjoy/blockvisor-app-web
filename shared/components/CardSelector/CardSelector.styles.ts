import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    background-color: var(--color-text-5-o3);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    aspect-ratio: 1;
    border-radius: 4px;
    border: 1px solid var(--color-primary-o0);
    transition: color 0.18s var(--transition-easing-cubic),
      border-color 0.18s var(--transition-easing-cubic);

    & :global(svg) {
      transition: color 0.18s var(--transition-easing-cubic);
    }
  `,
  label: css`
    color: var(--color-text-3);
  `,
  action: css`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: max-height, opacity;
    transition: max-height 0.5s ease-out,
      opacity 0.25s var(--transition-easing-cubic);

    @media ${breakpoints.fromLrg} and (hover: hover) {
      max-height: 0px;
      opacity: 0;
    }
  `,
  enabled: css`
    &:focus-within,
    &.card-selector--focus {
      color: var(--color-primary);
      border-color: var(--color-primary);

      & :global(svg) {
        color: var(--color-primary);
      }

      & .card-selector__action {
        transition: max-height 0.5s ease-in,
          opacity 0.25s var(--transition-easing-cubic);
        opacity: 1;
        max-height: 800px;
      }
    }
  `,
  disabled: css`
    cursor: not-allowed;
    color: var(--color-text-2);
    border: 1px solid var(--color-border-2);
    background-color: transparent;
  `,

  top: css`
    flex-grow: 1;
  `,
};
