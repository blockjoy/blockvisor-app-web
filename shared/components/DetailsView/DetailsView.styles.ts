import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 50px;
  `,
  headlineWrapper: css`
    width: 25%;
    min-width: 200px;
    max-width: 300px;
    margin-bottom: 20px;
  `,
  headline: css`
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
  `,
  contentWrapper: css`
    width: 75%;
    min-width: 300px;
    max-width: calc(100% - 300px);
  `,
};
