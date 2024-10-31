import { css } from '@emotion/react';

export const styles = {
  wrapper: (shouldAutoHide?: boolean, hasTags?: boolean) => css`
    display: inline-flex;
    align-items: center;
    flex-flow: row nowrap;
    position: relative;
    ${!hasTags && 'max-'}width: 100%;
    ${shouldAutoHide && 'visibility: hidden;'}
    min-height: 32px;
    min-width: 0;
  `,
  list: css`
    display: flex;
    flex-flow: row nowrap;
    gap: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
    min-width: 0;

    > div:last-of-type {
      margin-right: 8px;
    }
  `,
};

export const globalStyles = css`
  .table-wrapper,
  .grid-wrapper {
    overflow-x: hidden !important;
  }

  table,
  .grid-wrapper {
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
