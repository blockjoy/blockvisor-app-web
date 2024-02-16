import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: (type: TabType) => css`
    display: flex;
    flex-direction: column;

    ${type === 'inner' &&
    `@media ${breakpoints.fromLrg} {
      flex-direction: row;
    }`}
  `,
  navi: (type: TabType) => css`
    ${type === 'inner' &&
    `@media ${breakpoints.fromLrg} {
      width: 200px;
      padding-left: 0;
      padding-right: 0;
    }`}
  `,
  items: (type: TabType) => css`
    ${type === 'inner' &&
    `@media ${breakpoints.fromLrg} {
      width: calc(100% - 200px);
    }`}
  `,
  tabs: (type: TabType) => css`
    box-shadow: inset 0 -1px 0 0 var(--color-text-5-o10);
    position: relative;
    overflow: hidden;
    padding-top: 10px;

    ${type === 'inner' &&
    `@media ${breakpoints.fromLrg} {
      min-height: 300px;
      box-shadow: inset -1px 0 0 0 var(--color-text-5-o10);
      padding-top: 0;
    }`}
  `,
  tabList: (type: TabType) => css`
    overflow: auto;
    display: flex;
    flex-direction: row;
    gap: 32px;
    max-width: 100%;

    &::-webkit-scrollbar-track {
      border-top: 1px solid var(--color-text-5-o10);
    }

    ${type === 'inner' &&
    `@media ${breakpoints.fromLrg} {
      flex-direction: column;
      gap: 8px;
    }`}
  `,
  tabsButton: (type: TabType) => css`
    width: 100%;
    height: 60px;
    text-align: left;
    white-space: nowrap;
    padding: 0;
    font-size: 16px;
    color: var(--color-text-2);
    border-bottom: 1px solid transparent;
    transition: color 0.15s var(--transition-easing-cubic),
      border-color 0.15s var(--transition-easing-cubic);

    ${type === 'inner' &&
    `@media ${breakpoints.fromLrg} {
      border-bottom: 0;
      border-right: 1px solid transparent;
    }`}

    :hover {
      border-color: var(--color-text-2);
      color: var(--color-text-3);
    }

    &.active {
      color: var(--color-text-5);
      border-color: var(--color-text-5);
    }
  `,
  tabComponent: (type: TabType) => css`
    padding-top: 30px;
    padding-left: 0;

    ${type === 'inner' &&
    `@media ${breakpoints.fromLrg} {
      padding-top: 0;
      padding-left: 30px;
    }`}
  `,
  loading: css`
    display: flex;
    align-items: center;
    height: 60px;
  `,
};
