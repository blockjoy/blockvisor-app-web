import { css } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';

export const styles = {
  base: css`
    aspect-ratio: 1;
    display: inline-flex;
    font-weight: var(--font-weight-bold);
    justify-content: center;
    align-items: center;
    gap: 10px;
    ${typo.button}
    text-decoration: none;

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.4;
    }
  `,
  rounded: css`
    border-radius: 4px;
  `,

  round: css`
    border-radius: 50%;
  `,

  normal: css`
    width: 56px;
  `,

  medium: css`
    width: 40px;
  `,

  small: css`
    width: 32px;
  `,

  tiny: css`
    width: 24px;
  `,

  primary: css`
    background-color: var(--color-primary);
    color: var(--color-foreground-secondary);
    box-shadow: 0px 0px 0px 3px var(--color-primary-o0);
    transition: box-shadow 0.18s var(--transition-easing-cubic);

    &:hover,
    &:active {
      box-shadow: 0px 0px 0px 3px var(--color-primary-o30);
    }
  `,

  secondary: css`
    background-color: var(--color-secondary);
    color: var(--color-foreground-secondary);
    box-shadow: 0px 0px 0px 3px var(--color-secondary-o0);
    transition: box-shadow 0.18s var(--transition-easing-cubic);

    &:hover,
    &:active {
      box-shadow: 0px 0px 0px 3px var(--color-secondary-o30);
    }
  `,

  outline: css`
    color: var(--color-text-2);
    border: 1px solid var(--color-text-2);
    background-color: transparent;

    &:hover,
    &:active {
      color: var(--color-border-3);
      border: 2px solid var(--color-text-2);
    }
  `,

  ghost: css`
    color: var(--color-text-2);
    transition: color 0.18s var(--transition-easing-cubic);

    &:hover,
    &:active,
    &:focus {
      color: var(--color-border-3);
    }
  `,
};
