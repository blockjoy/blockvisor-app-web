import { css } from '@emotion/react';

export const typo = {
  base: css`
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
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
