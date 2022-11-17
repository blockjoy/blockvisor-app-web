import { css } from '@emotion/react';
import { breakpoints } from './variables.styles';

/**
 * Typo values
 */

export const typo = {
  heading1: css`
    font-family: var(--font-family-primary);
    font-size: 71px;
    line-height: 65px;
    font-weight: 400;
    letter-spacing: -3px;
  `,
  heading2: css`
    font-family: var(--font-family-primary);
    font-size: 32px;
    line-height: 32px;
    letter-spacing: -1px;
  `,
  heading3: css`
    font-family: var(--font-family-primary);
    font-size: 32px;
    line-height: 40px;
    font-weight: 400;
  `,
  heading4: css`
    font-family: var(--font-family-primary);
    font-size: 32px;
    line-height: 40px;
  `,
  heading5: css`
    font-family: var(--font-family-primary);
    font-size: 24px;
    line-height: 36px;
  `,
  heading6: css`
    font-family: var(--font-family-primary);
    font-size: 20px;
    line-height: 24px;
  `,
  body1: css`
    font-family: var(--font-family-primary);
    font-size: 11px;
    line-height: 16px;
    font-weight: 700;
    text-transform: uppercase;
  `,
  body2: css`
    font-family: var(--font-family-primary);
    font-size: 14px;
    line-height: 20px;
  `,
  body3: css`
    font-family: var(--font-family-primary);
    font-size: 12px;
    line-height: 16px;
  `,
};
