export const styles = {
  base: css`
    padding: 6px 0;
    display: inline-flex;
    color: theme(--color-text-4);
    align-items: center;
    gap: 6px;
    line-height: 1;
    transition: color 0.15s var(--transition-easing-cubic);

    & :global(.sorter__arrow) {
      color: theme(--color-text-2);

      & :global(path) {
        transition: color 0.15s var(--transition-easing-cubic);
      }
    }

    &:hover,
    &:active {
      color: theme(--color-text-5);

      & :global(.sorter__arrow) {
        color: theme(--color-text-3);
      }
    }
  `,
  asc: css`
    & :global(.sorter__arrow--up) {
      color: theme(--color-text-5);
    }
  `,
  desc: css`
    & :global(.sorter__arrow--down) {
      color: theme(--color-text-5);
    }
  `,
};
