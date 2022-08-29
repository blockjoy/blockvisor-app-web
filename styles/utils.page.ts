import { css } from '@emotion/react';

const notFoundPage = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > * {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100%;
    flex-grow: 1;
  }
`;

export { notFoundPage };
