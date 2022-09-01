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

/**
 * Fluid typography settings:
 * - Hold the minimum value from 0px to 500px screen width
 * - Have a variable value between 500px and 1000px screen width
 * - Hold the maximum value from 1000px screen width
 */

const fluidCalc = (min: string, max: string, size = '2vw + 1rem') =>
  `clamp(var(${min}), ${size}, var(${max}))`;

export const fluid = {
  /* https://modern-fluid-typography.vercel.app?rootFontSize=16&minSize=12&fluidSize=0.8&relativeSize=0.5&maxSize=16 */
  base: css`
    font-size: fluidCalc(
      '--font-size-tiny,' '--font-size-base',
      '0.8vw + 0.5rem'
    );
    line-height: fluidCalc(
      '--line-height-tiny',
      '--line-height-base',
      '1.9vw + 0.4rem'
    );
  `,
  /* https://modern-fluid-typography.vercel.app/?rootFontSize=16&minSize=14&fluidSize=1.1&relativeSize=0.6&maxSize=20 */
  medium: css`
    font-size: fluidCalc(
      '--font-size-small',
      ' --font-size-medium',
      '1.2vw + 0.5rem'
    );
    line-height: fluidCalc(
      '--line-height-small',
      '--line-height-medium',
      '0.8vw + 1rem'
    );
  `,
  /* https://modern-fluid-typography.vercel.app/?rootFontSize=16&minSize=16&fluidSize=2&relativeSize=0.5&maxSize=24 */
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
  /* https://modern-fluid-typography.vercel.app?rootFontSize=16&minSize=20&fluidSize=2.4&relativeSize=0.7&maxSize=32 */
  xlarge: css`
    font-size: fluidCalc(
      '--font-size-medium',
      '--font-size-xlarge',
      '2.4vw + 0.5rem'
    );
    line-height: fluidCalc(
      '--line-height-medium',
      '--line-height-xlarge',
      '3.2vw + 0.5rem'
    );
  `,
  /* https://modern-fluid-typography.vercel.app?rootFontSize=16&minSize=24&fluidSize=2&relativeSize=1&maxSize=40 */
  xxlarge: css`
    font-size: fluidCalc(
      '--font-size-large',
      '--font-size-xxlarge',
      '3.2vw + 0.5rem'
    );
    line-height: fluidCalc(
      '--line-height-large',
      '--line-height-xxlarge',
      '2.4vw + 1.25rem'
    );
    letter-spacing: fluidCalc(
      '--letter-spacing-xxlarge',
      '--letter-spacing-default',
      '-2vw + 1rem'
    );
  `,
  /* https://modern-fluid-typography.vercel.app?rootFontSize=16&minSize=32&fluidSize=3.2&relativeSize=1&maxSize=48 */
  xxxlarge: css`
    font-size: fluidCalc(
      '--font-size-xlarge',
      '--font-size-xxxlarge',
      '3.2vw + 1rem'
    );
    line-height: fluidCalc(
      ' --line-height-xlarge',
      '  --line-height-xxxlarge',
      2vw + 2rem
    );
    letter-spacing: fluidCalc(
      '--letter-spacing-xxxlarge',
      '--letter-spacing-default',
      -2vw + 1rem
    );
  `,
  /* https://modern-fluid-typography.vercel.app?rootFontSize=16&minSize=40&fluidSize=4&relativeSize=1.25&maxSize=60 */
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
