import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    flex: 0 0 160px;
    width: 160px;
  `,
  header: css`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 120px;
    color: rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 10px;

    & path {
      fill: rgba(255, 255, 255, 0.3);
    }
  `,
};
