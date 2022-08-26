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
  micro: css`
    font-size: var(--font-size-micro);
    line-height: var(--line-height-micro);
    letter-spacing: var(--letter-spacing-default);
  `,
  tiny: css`
    font-size: var(--font-size-tiny);
    line-height: var(--line-height-tiny);
    letter-spacing: var(--letter-spacing-default);
  `,
  smaller: css`
    font-size: var(--font-size-smaller);
    line-height: var(--line-height-smaller);
    letter-spacing: var(--letter-spacing-default);
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
    font-size: var(--font-size-smaller);
    line-height: var(--line-height-smaller);
    letter-spacing: var(--letter-spacing-default);
  `,
  large: css`
    font-size: var(--font-size-large);
    line-height: var(--line-height-large);
    letter-spacing: var(--letter-spacing-default);
  `,
  xlarge: css`
    font-size: var(--font-size-xlarge);
    line-height: var(--line-height-xlarge);
    letter-spacing: var(--letter-spacing-default);
  `,
  xxlarge: css`
    font-size: var(--font-size-xxlarge);
    line-height: var(--line-height-xxlarge);
    letter-spacing: var(--letter-spacing-xxlarge);
  `,
  xxxlarge: css`
    font-size: var(--font-size-xxxlarge);
    line-height: var(--line-height-xxxlarge);
    letter-spacing: var(--letter-spacing-xxlarge);
  `,
  huge: css`
    font-size: var(--font-size-huge);
    line-height: var(--line-height-huge);
    letter-spacing: var(--letter-spacing-huge);
  `,

  /** Special */
  microlabel: css`
    font-size: var(--font-size-microlabel);
    line-height: var(--line-height-microlabel);
    letter-spacing: var(--letter-spacing-microlabel);
  `,
  uppercase: css`
    text-transform: uppercase;
  `,
  capitalize: css`
    text-transform: capitalize;
  `,
};

export const tAlign = {
  right: css`
    text-align: right;
  `,
};

export const textColor = {
  warning: css`
    color: var(--color-utility-warning);
  `,
};
