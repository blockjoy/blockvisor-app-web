import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    position: relative;
  `,
  dropdownInner: css`
    max-height: 260px;

    ::-webkit-scrollbar-track {
      background: rgb(255 255 255 / 10%);
    }
  `,
  buttonWrapper: css`
    padding: 12px 10px;
  `,
};
