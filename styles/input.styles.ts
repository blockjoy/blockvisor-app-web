import { css } from '@emotion/react';
import { typo } from './typo.styles';
import { breakpoints } from './variables.styles';

const inputWrapper = css`
  position: relative;
  margin-bottom: 48px;

  &:hover,
  &:focus {
    input {
      border-bottom: 1px solid white;

      &::placeholder {
        color: white;
      }
    }

    label {
      color: white;
    }
  }

  @media ${breakpoints.fromSml} {
    margin-bottom: 40px;
  }
`;

const base = css`
  position: relative;
  width: 100%;
  padding-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease-out;

  @media ${breakpoints.fromSml} {
    padding-bottom: 16px;
  }

  @media ${breakpoints.fromMed} {
    padding-right: 120px;
  }
`;

const primary = css`
  ${base}
  ${typo.body1}
  color: white;
  background-color: var(--color-secondary);
  border-bottom: 1px solid var(--color-textGray);
`;

const label = css`
  ${typo.heading5}
`;

const labelPrimary = css`
  ${label}
  ${typo.heading5}
`;

const errorMessage = css`
  ${typo.body1}
  font-family: var(--font-family-primary);
`;

export const input = {
  inputWrapper,
  primary,
  errorMessage,
  label,
  labelPrimary,
};
