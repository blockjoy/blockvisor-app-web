import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    display: flex;
    flex-flow: row nowrap;
    gap: 5px;
    align-content: center;
  `,
  icon: css`
    position: relative;
    display: block;
    width: 28px;

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }

    svg {
      width: 28px;
      height: auto;
    }
  `,
};
