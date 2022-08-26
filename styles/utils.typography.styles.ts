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
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
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
  label: css`
    font-size: var(--font-size-label);
    line-height: var(--line-height-label);
    letter-spacing: var(--letter-spacing-label);
  `,
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

const fluidCalc = (min: string, max: string, size = '2vw + 1rem') =>
  `clamp(var(${min}), ${size}, var(${max}))`;

export const fluid = {
  large: css`
    font-size: ${fluidCalc(
      '--font-size-base',
      '--font-size-large',
      '1.6vw + 0.5rem',
    )};
    line-height: ${fluidCalc(
      '--line-height-base',
      '--line-height-large',
      '1.6vw + 1rem',
    )};
  `,
  huge: css`
    font-size: ${fluidCalc(
      '--font-size-xxlarge',
      '--font-size-huge',
      '4vw + 1.25rem',
    )};
    line-height: ${fluidCalc(
      '--line-height-xxlarge',
      '--line-height-huge',
      '4vw + 1.5rem',
    )};
    letter-spacing: ${fluidCalc(
      '--letter-spacing-huge',
      '--letter-spacing-xxlarge',
      '-2vw + 1rem',
    )};
  `,
};
