import { css } from '@emotion/react';

export const styles = {
  base: css`
    position: relative;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    padding: 15px 22px;
    min-height: 300px;
    max-width: 700px;
    border: 2px dashed var(--color-border-2);
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    margin-bottom: 20px;
  `,
  text: css`
    color: var(--color-text-3);
  `,
  label: css`
    max-width: 22ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  noFiles: css`
    &:hover,
    &:active {
      background-color: var(--color-text-5-o3);
    }
  `,
  hasFiles: css`
    cursor: auto;
  `,
  remove: css`
    padding-left: 6px;
    cursor: pointer;

    svg {
      path {
        fill: var(--color-text-4);
        opacity: 1;
        transition: fill 0.18s var(--transition-easing-cubic);

        &:hover,
        &:active {
          fill: var(--color-text-5);
        }
      }
    }
  `,
};
