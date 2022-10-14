import { css } from '@emotion/react';

export const styles = {
  tabs: css`
    box-shadow: inset 0 -1px 0 0 var(--color-text-5-o10);
    position: relative;
    overflow: hidden;
    max-width: 100wv;
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
    white-space: nowrap;
    padding: 20px 0;
    color: var(--color-text-2);
    border-bottom: 1px solid transparent;
    transition: color 0.15s var(--transition-easing-cubic),
      border-color 0.15s var(--transition-easing-cubic);
  `,
  activeButton: css`
    color: var(--color-text-5);
    border-bottom: 1px solid var(--color-text-5);
  `,
  tabComponent: css`
    margin-top: 60px;
  `,
};
