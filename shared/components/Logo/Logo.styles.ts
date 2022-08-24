import { css } from '@emotion/react';

const logo = css`
  margin: 0;
`;

const logoLink = css`
  display: inline-block;
  transition: opacity 0.18s cubic-bezier(0.55, 0.06, 0.68, 0.19);

  &:hover,
  &:active {
    opacity: 0.75;
  }
`;

const logoLinkCentered = css`
  display: flex;
  justify-content: center;
`;

const logoPrimary = css`
  fill: #f8faf6;
  opacity: 0.3;

  @media (min-width: 55rem) {
    fill: var(--color-primary);
    opacity: 1;
  }
`;

const logoFaded = css`
  fill: #f8faf6;
  opacity: 0.3;
`;

export { logo, logoFaded, logoLink, logoLinkCentered, logoPrimary };
