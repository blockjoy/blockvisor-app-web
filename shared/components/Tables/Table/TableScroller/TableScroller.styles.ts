import { css } from '@emotion/react';

export const styles = {
  wrapper: (isVisible?: boolean) => css`
    ${!isVisible && `display: none;`}
    position: fixed;
    bottom: 0;
    width: 100%;
    overflow-x: visible;
    overflow-y: hidden;
    height: 19px;
    z-index: 1000;
  `,
  scroller: css`
    width: 2500px;
    height: 44px;
  `,
};
