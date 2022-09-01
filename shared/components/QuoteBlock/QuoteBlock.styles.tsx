import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

const quoteBlock = css`
  background-color: var(--color-secondary);
  color: var(--color-foreground-secondary);
  --quote-spacing: clamp(120px, 15vh, 160px);
  padding-top: 80px;
  padding-bottom: 80px;
  background-size: 73px 73px;
  background-image: url('/assets/images/pattern-star.png');
  animation: moveBackgroundRight 2.5s linear infinite;

  @media ${breakpoints.fromHuge} {
    padding-top: var(--quote-spacing);
    padding-bottom: var(--quote-spacing);
  }

  @keyframes moveBackgroundRight {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 73px 0;
    }
  }
`;

const quoteBlockRole = css`
  color: var(--color-text-1-o30);
`;

const quoteBlockAuthor = css`
  max-width: 200px;
  display: grid;
  grid-template-columns: 40px auto;
  grid-gap: 12px;
  margin-top: clamp(40px, 7vh, 60px);
`;

const quoteBlockContent = css`
  grid-column-start: 1;
  grid-column-end: 13;

  @media ${breakpoints.fromHuge} {
    grid-column-start: 3;
    grid-column-end: 9;
  }
`;

export { quoteBlock, quoteBlockContent, quoteBlockRole, quoteBlockAuthor };
