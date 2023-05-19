import { css } from '@emotion/react';

export const styles = {
  button: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--color-text-1-o70);
    padding: 8px;

    & svg {
      margin: 0 auto;
      width: 24px;
    }

    & path {
      transform-origin: 50% 50%;
    }
  `,

  small: css`
    & svg {
      width: 40px;
    }
  `,

  medium: css`
    & svg {
      width: 60px;
    }
  `,

  large: css`
    & svg {
      width: 100px;
    }
  `,

  page: css`
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & svg {
      width: 100px;
    }
  `,
};
