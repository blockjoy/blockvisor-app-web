import { css } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';
import { breakpoints } from 'styles/variables.styles';

const buttonSelector = css`
  align-items: baseline;
  gap: 8px 4px;
  flex-wrap: wrap;
  display: flex;
`;

const buttonSelectorLabel = css`
  ${typo.smaller}
  font-weight: var(--font-weight-bold);
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.18s var(--transition-easing-cubic);
  padding: 0 20px;
`;

const buttonSelectorInput = css`
  &:hover(:not(:checked)) + ${buttonSelectorLabel} {
    opacity: 0.75;
  }

  &:checked + ${buttonSelectorLabel} {
    opacity: 1;
  }

  &:focus + ${buttonSelectorLabel} {
    outline: 2px solid var(--color-text-5-o10);
    border-radius: 4px;
  }
`;

const buttonSelectorTitle = css`
  display: block;
  color: var(--color-text-3);
  flex-basis: 100%;

  @media ${breakpoints.fromMed} {
    flex-basis: auto;
  }
`;

const buttonSelectorList = css`
  display: flex;
  overflow: auto;
  white-space: nowrap;
`;

export {
  buttonSelector,
  buttonSelectorLabel,
  buttonSelectorTitle,
  buttonSelectorList,
  buttonSelectorInput,
};
