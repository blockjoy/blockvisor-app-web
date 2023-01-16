import { css } from '@emotion/react';

const link = css`
  text-decoration: none;
  color: var(--color-text-2);
`;

const linkPrimary = css`
  color: var(--color-primary);
`;

const linkUnderline = css`
  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`;

export { link, linkPrimary, linkUnderline };
