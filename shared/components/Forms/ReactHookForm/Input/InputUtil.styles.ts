import { css } from '@emotion/react';

const inputUtil = css`
  color: var(--color-text-2);
  fill: var(--color-text-2);
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
`;

const inputUtilLeft = css`
  left: 12px;
`;

const inputUtilRight = css`
  right: 12px;
`;

export { inputUtil, inputUtilLeft, inputUtilRight };
