import { css } from '@emotion/react';

export const styles = {
  wrapper: css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 8px;
  `,

  slider: css`
    height: 20px;
    display: flex;
    width: 100%;
  `,
  progress: css`
    width: 100%;
    height: 2px;
    align-self: center;
  `,
  progressBar: css`
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  label: css`
    font-size: 14px;
    margin-top: 10px;
    color: var(--color-text-3);
  `,
};
