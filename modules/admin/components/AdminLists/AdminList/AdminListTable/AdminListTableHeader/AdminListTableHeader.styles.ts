import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  tableHeader: css`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 10px;
    width: 100%;
  `,
  draggable: css`
    position: absolute;
    z-index: 2;
    top: 0;
    right: -1px;
    bottom: 0;
    width: 6px;
    cursor: col-resize;

    @media ${breakpoints.toSml} {
      display: none;
    }
  `,
  tableHeaderText: css`
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    white-space: nowrap;
    margin-right: -10px;
  `,
};
