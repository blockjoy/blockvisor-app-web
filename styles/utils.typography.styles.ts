import { css } from '@emotion/react';

export const typo = {
  buttonSmall: css`
    font-size: var(--font-size-button-small);
    line-height: var(--line-height-button-small);
    letter-spacing: var(--letter-spacing-default);
  `,
  button: css`
    font-size: var(--font-size-button);
    line-height: var(--line-height-button);
    letter-spacing: var(--letter-spacing-button);
  `,
  base: css`
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    letter-spacing: var(--letter-spacing-default);
  `,
  medium: css`
    font-size: var(--font-size-medium);
    line-height: var(--line-height-medium);
    letter-spacing: var(--letter-spacing-default);
  `,
  small: css`
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
    letter-spacing: var(--letter-spacing-default);
  `,
  tiny: css`
    font-size: var(--font-size-tiny);
    line-height: var(--line-height-tiny);
    letter-spacing: var(--letter-spacing-default);
  `,
};

export const tAlign = {
  right: css`
    text-align: right;
  `,
};
