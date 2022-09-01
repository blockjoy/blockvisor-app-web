import { css } from '@emotion/react';
import { typo } from './typo.styles';

const wrapper = css`
  position: relative;
`;

const primary = css`
  position: relative;
  width: 100%;
  height: 300px;
  padding: 32px;
  padding-right: 40px;
  margin-bottom: 32px;
  ${typo.body1}
  font-family: var(--font-family-primary);
  color: white;
  background-color: var(--color-secondary);
  border: 1px solid var(--color-textGray);
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:focus,
  &:hover {
    border: 1px solid white;
  }
`;

const textareaError = css`
  border: 1px solid var(--color-error);
  transition-delay: 0.5s;
`;

const errorMessage = css`
  font-family: var(--font-family-primary);
  background-color: transparent;
  color: transparent;
  transition: all 0.2s ease-in-out;
`;

export const textarea = {
  wrapper,
  primary,
  textareaError,
  errorMessage,
};
