import { css } from '@emotion/react';

export const styles = {
  tabs: css`
    box-shadow: inset 0 -1px 0 0 var(--color-text-5-o10);
    position: relative;
    overflow: hidden;
    padding-top: 10px;
  `,
  tabList: css`
    overflow: auto;
    display: flex;
    gap: 32px;
    max-width: 100%;

    &::-webkit-scrollbar-track {
      border-top: 1px solid var(--color-text-5-o10);
    }
  `,
  tabsButton: css`
    height: 60px;
    white-space: nowrap;
    padding: 0;
    font-size: 16px;
    color: var(--color-text-2);
    border-bottom: 1px solid transparent;
    transition: color 0.15s var(--transition-easing-cubic),
      border-color 0.15s var(--transition-easing-cubic);

    :hover {
      border-bottom: 1px solid var(--color-text-2);
      color: var(--color-text-3);
    }

    &.active {
      color: var(--color-text-5);
      border-bottom: 1px solid var(--color-text-5);
    }
  `,
  tabComponent: css`
    padding-top: 30px;
  `,
};
