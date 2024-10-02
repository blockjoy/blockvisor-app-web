import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  tableHeader: css`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    padding: 0 20px 0 0;
    height: 48px;
  `,
  resizer: css`
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    cursor: col-resize;

    @media ${breakpoints.toSml} {
      display: none;
    }
  `,
  tableHeaderText: css`
    min-width: 0;
    margin-right: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5;
    white-space: nowrap;
  `,
};
