import { css } from '@emotion/css';

export const styles = {
  base: css`
    display: block;
    border-radius: 100%;
    aspect-ratio: 1;
    text-transform: uppercase;
    color: theme(--color-text-1);
    background-color: theme(--color-secondary);
    overflow: hidden;
    text-align: center;
    position: relative;
    isolation: isolate;
  `,
  initials: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  `,
  withImage: css`
    border: 1px solid theme(--color-border-4);
  `,
  image: css`
    object-fit: cover;
    object-position: center;
    position: relative;
    z-index: var(--level-1);
    height: auto;
    color: transparent;
    height: 100%;
  `,
  small: css`
    width: 24px;
    line-height: 1;
  `,
  'medium-small': css`
    width: 32px;
    line-height: 1;
  `,
  medium: css`
    width: 40px;
    line-height: 1;
  `,
};
