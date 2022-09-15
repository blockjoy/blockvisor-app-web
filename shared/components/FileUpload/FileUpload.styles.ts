import { css } from '@emotion/react';

export const styles = {
  base: css`
    & :global(.file-upload__input) {
      position: relative;
      display: inline-flex;
      gap: 8px;
      align-items: center;
      padding: 15px 22px;
      border: 1px dashed var(--color-border-2);
      border-radius: 4px;
      cursor: pointer;
    }

    & :global(.file-upload__input--no-files) {
      &:hover,
      &:active {
        background-color: var(--color-text-5-o3);
      }
    }

    & :global(.file-upload__input--no-files.file-upload__input--dragging) {
      background-color: var(--color-text-5-o3);
    }

    & :global(.file-upload__input--has-files) {
      cursor: auto;
    }
  `,
  label: css`
    max-width: 22ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  remove: css`
    padding-left: 6px;
    cursor: pointer;

    & :global(svg) {
      opacity: 1;
    }

    & :global(path) {
      fill: var(--color-text-4);
      opacity: 1;
      transition: fill 0.18s var(--transition-easing-cubic);
    }

    &:hover,
    &:active {
      & :global(svg) {
        opacity: 1;
      }

      & :global(path) {
        fill: var(--color-text-5);
        opacity: 1;
      }
    }
  `,
};
