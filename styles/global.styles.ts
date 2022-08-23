import { css } from '@emotion/react';
import { breakpoints } from './variables.styles';

/**
 * Root CSS
 */

export const globalStyles = css`
  :root {
    /* --- PRIMARY --- */
    --color-primary: hsl(90, 84%, 75%);
    --color-primary-o0: hsla(90, 84%, 75%, 0);
    --color-primary-o30: hsla(90, 84%, 75%, 0.3);

    /* --- SECONDARY --- */
    --color-secondary: hsl(29, 82%, 80%);
    --color-secondary-o0: hsla(29, 82%, 80%, 0);
    --color-secondary-o30: hsla(29, 82%, 80%, 0.3);

    /* --- TERTIARY --- */
    --color-tertiary: hsl(60, 5%, 85%);

    /* --- TEXT --- */
    --color-text-1: hsl(160, 4%, 14%);
    --color-text-1-o20: hsla(160, 4%, 14%, 0.2);
    --color-text-1-o30: hsla(160, 4%, 14%, 0.3);
    --color-text-1-o70: hsla(160, 4%, 14%, 0.7);
    --color-text-2: hsl(90, 2%, 37%);
    --color-text-3: hsl(90, 3%, 65%);
    --color-text-4: hsl(90, 5%, 81%);
    --color-text-5: hsl(90, 29%, 97%);
    --color-text-5-o3: hsla(90, 29%, 97%, 0.03);
    --color-text-5-o10: hsla(90, 29%, 97%, 0.1);
    --color-text-5-o20: hsla(90, 29%, 97%, 0.2);
    --color-text-5-o30: hsla(90, 29%, 97%, 0.3);

    /* --- UTILITY --- */
    --color-utility-success: hsl(143, 61%, 37%);
    --color-utility-success-o10: hsla(143, 61%, 37%, 0.1);
    --color-utility-warning: hsl(0, 79%, 69%);
    --color-utility-warning-o10: hsla(0, 69%, 45%, 0.1);
    --color-utility-note: hsl(40, 80%, 57%);

    /* --- BACKGROUND --- */
    --color-overlay-background-1: hsl(160, 3%, 22%);
    --color-overlay-background-2: hsl(180, 4%, 15%);
    --color-overlay-background-2-o50: hsla(180, 4%, 15%, 0.5);

    /* --- BORDER --- */
    --color-border-1: hsl(160, 4%, 14%);
    --color-border-2: hsl(90, 2%, 37%);
    --color-border-3: hsl(0, 0%, 73%);
    --color-border-4: hsl(0, 0%, 83%);
    --color-border-5: hsl(90, 29%, 97%);

    /* --- INPUT --- */
    --color-input-background: hsl(165, 4%, 20%);

    /* --- OTHERS --- */
    --color-foreground-secondary: hsl(160, 4%, 14%); /* Black */
    --color-foreground-secondary-o10: hsla(160, 4%, 14%, 0.1); /* Black */
    --color-foreground-tertiary: hsl(160, 5%, 21%); /* Black 2 */
    --color-shadow-o10: hsla(0, 0%, 0%, 0.1);
    --color-shadow-o80: hsla(0, 0%, 0%, 0.8);
  }

  /* --- LIGHT THEME --- */
  :root.theme--light {
    /* TODO: Add light theme colors, these are just for testing */
    --color-overlay-background-1: hsl(240, 20%, 85%);

    --color-text-3: hsl(160, 4%, 14%);
    --color-text-1: hsl(96, 3%, 65%);
  }

  /* --- FONT SIZES --- */
  --root-font-size: 16;
  --font-size-button: calc((16 / var(--root-font-size)) * 1rem);
  --font-size-button-small: calc((13 / var(--root-font-size)) * 1rem);
  --font-size-microlabel: calc((10 / var(--root-font-size)) * 1rem);
  --font-size-micro: calc((10 / var(--root-font-size)) * 1rem);
  --font-size-tiny: calc((12 / var(--root-font-size)) * 1rem);
  --font-size-label: calc((12 / var(--root-font-size)) * 1rem);
  --font-size-smaller: calc((13 / var(--root-font-size)) * 1rem);
  --font-size-small: calc((14 / var(--root-font-size)) * 1rem);
  --font-size-base: calc((16 / var(--root-font-size)) * 1rem);
  --font-size-medium: calc((20 / var(--root-font-size)) * 1rem);
  --font-size-large: calc((24 / var(--root-font-size)) * 1rem);
  --font-size-xlarge: calc((32 / var(--root-font-size)) * 1rem);
  --font-size-xxlarge: calc((40 / var(--root-font-size)) * 1rem);
  --font-size-xxxlarge: calc((48 / var(--root-font-size)) * 1rem);
  --font-size-huge: calc((60 / var(--root-font-size)) * 1rem);

  /* --- LINE HEIGHTS--- */
  --line-height-micro: calc((12 / var(--root-font-size)) * 1rem);
  --line-height-tiny: calc((16 / var(--root-font-size)) * 1rem);
  --line-height-microlabel: calc((16 / var(--root-font-size)) * 1rem);
  --line-height-label: calc((16 / var(--root-font-size)) * 1rem);
  --line-height-smaller: calc((20 / var(--root-font-size)) * 1rem);
  --line-height-small: calc((20 / var(--root-font-size)) * 1rem);
  --line-height-base: calc((24 / var(--root-font-size)) * 1rem);
  --line-height-button-small: calc((20 / var(--root-font-size)) * 1rem);
  --line-height-button: calc((24 / var(--root-font-size)) * 1rem);
  --line-height-medium: calc((28 / var(--root-font-size)) * 1rem);
  --line-height-large: calc((32 / var(--root-font-size)) * 1rem);
  --line-height-xlarge: calc((40 / var(--root-font-size)) * 1rem);
  --line-height-xxlarge: calc((44 / var(--root-font-size)) * 1rem);
  --line-height-xxxlarge: calc((52 / var(--root-font-size)) * 1rem);
  --line-height-huge: calc((64 / var(--root-font-size)) * 1rem);

  /* --- LETTER SPACINGS --- */
  --letter-spacing-huge: calc((-2 / var(--root-font-size)) * 1rem);
  --letter-spacing-xxxlarge: calc((-2 / var(--root-font-size)) * 1rem);
  --letter-spacing-xxlarge: calc((-1 / var(--root-font-size)) * 1rem);
  --letter-spacing-button: calc((-0.5 / var(--root-font-size)) * 1rem);
  --letter-spacing-default: calc((0 / var(--root-font-size)) * 1rem);
  --letter-spacing-microlabel: calc((1 / var(--root-font-size)) * 1rem);
  --letter-spacing-label: calc((1.25 / var(--root-font-size)) * 1rem);

  /* --- FONT FAMILIES --- */
  --font-family-primary: 'Styrene A LC', -apple-system, BlinkMacSystemFont,
    avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto,
    noto, arial, sans-serif;

  /* --- FONT WEIGHTS --- */
  --font-weight-normal: 400;
  --font-weight-bold: 700;

  /** --- LEVELS --- */
  --level-n1: -1;
  --level-1: 1;
  --level-2: 2;
  --level-3: 3;
  --level-4: 4;
  --level-9: 9;

  /* --- TRANSITION EASING --- */
  --transition-easing-cubic: cubic-bezier(0.55, 0.06, 0.68, 0.19);

  @font-face {
    font-family: 'Neutra2-Light';
    font-weight: 300;
    src: url('/fonts/Neutra2-Light.otf') format('opentype');
  }

  @font-face {
    font-family: 'Neutra2-Book';
    font-weight: 400;
    src: url('/fonts/Neutra2-Book.otf') format('opentype');
  }

  @font-face {
    font-family: 'Neutra2-Demi';
    font-weight: 600;
    src: url('/fonts/Neutra2-Demi.otf') format('opentype');
  }

  @keyframes rotateClockwise {
    from {
      transform: rotate3d(0, 0, 1, 0deg) translate3d(0, 0, 0);
    }
    to {
      transform: rotate3d(0, 0, 1, 360deg) translate3d(0, 0, 0);
    }
  }

  @keyframes blink {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  html {
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    margin: 0 auto;
    color: var(--color-text);
    max-width: 1720px;

    @media ${breakpoints.toMed} {
      padding: 0 20px;
    }
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  button {
    &:focus {
      outline: none;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul {
    margin: 0;
    padding: 0;
  }

  ul,
  ol,
  dl {
    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
    list-style: none;
  }
`;
