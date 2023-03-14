import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 50px;
  `,
  headlineWrapper: css`
    width: 25%;
    max-width: 300px;
  `,
  headline: css`
    font-size: 10px;

    letter-spacing: 1px;
    text-transform: uppercase;
  `,
  contentWrapper: css`
    width: 75%;
    max-width: cacl(100% - 300px);
  `,
};
