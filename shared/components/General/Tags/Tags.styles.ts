import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    display: inline-flex;
    flex-flow: row nowrap;
    gap: 8px;
    position: relative;
  `,
  list: css`
    display: flex;
    flex-flow: row nowrap;
    gap: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
  `,
};

export const globalStyles = css`
  .table-wrapper {
    overflow-x: hidden;
  }

  table {
    position: relative;

    ::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
  }
`;
