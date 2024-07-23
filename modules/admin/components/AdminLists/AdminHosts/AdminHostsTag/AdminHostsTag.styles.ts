import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    position: relative;
  `,
  dropdownInner: css`
    padding: 10px 10px 16px;
    display: grid;
    gap: 16px;
  `,
  dropdownMenu: css`
    left: auto;
    right: 0;
    top: 54px;
    min-width: 220px;
    overflow: visible;
  `,
  buttonWrapper: css`
    padding: 12px 10px;
  `,
};
