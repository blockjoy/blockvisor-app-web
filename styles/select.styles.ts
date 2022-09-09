import { css } from '@emotion/react';
import { typo } from './typo.styles';
import { breakpoints } from './variables.styles';

const base = css`
  cursor: pointer;
  transition: all 0.2s ease-out;
  appearance: none;
`;

const primary = css`
  ${base}
  margin: 24px 0;
  padding-bottom: 12px;
  ${typo.heading5}
  color: white;
  background-color: var(--color-secondary);
  border: none;
  border-bottom: 1px solid var(--color-textGray);
  outline: none;

  &:focus {
    outline: 2px solid var(--color-primary);
  }

  &:hover,
  &:focus {
    border-bottom: 1px solid white;
  }

  @media ${breakpoints.fromMed} {
    ${typo.heading4}
  }

  @media ${breakpoints.fromXLrg} {
    ${typo.heading3}
  }
`;

const secondary = css`
  width: min-content;
  margin-bottom: 24px;
  padding: 16px;
  padding-top: 0;
  ${typo.heading6}
  color: var(--color-text);
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color-textGray);
  outline: none;
  cursor: pointer;

  &:focus {
    outline: 2px solid var(--color-primary);
  }
`;

const labelPrimary = css`
  ${typo.body1}
  font-family: var(--font-family-primary);
  text-transform: uppercase;
`;

export const select = {
  primary,
  labelPrimary,
};
