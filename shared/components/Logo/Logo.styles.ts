import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

const logo = css`
  margin: 0;
`;

const logoLink = css`
  display: inline-block;
  transition: opacity 0.18s var(--transition-easing-cubic);

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

  @media ${breakpoints.fromLrg} {
    fill: var(--color-primary);
    opacity: 1;
  }
`;

const logoFaded = css`
  fill: #f8faf6;
  opacity: 0.3;
`;

export { logo, logoFaded, logoLink, logoLinkCentered, logoPrimary };
