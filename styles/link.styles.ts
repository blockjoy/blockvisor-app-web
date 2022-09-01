import { css } from '@emotion/css';

const link = css`
  text-decoration: none;
  color: var(--color-text-2);
`;

const linkPrimary = css`
  &:visited {
    color: var(--color-primary);
  }
`;

const linkUnderline = css`
  &:hover,
  &:active,
  &:focus {
    text-decoration: underline;
  }
`;

export { link, linkPrimary, linkUnderline };
