import { css } from '@emotion/react';

export const styles = {
  drawer: css`
    top: 0;
    width: 1000px;
    max-width: 90vw;
    height: 100vh;

    > div:nth-of-type(2) {
      padding-bottom: 0;
    }
  `,
  bottom: css`
    position: sticky;
    bottom: 0;
    background: #222524;
    padding: 10px 0;
  `,
  error: css`
    margin-bottom: 10px;
  `,
  orgPicker: css`
    margin-bottom: 15px;
    position: relative;
    top: -10px;
  `,
};
