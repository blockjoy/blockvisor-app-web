import { css } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';

const inputLabel = css``;

export const styles = {
  wrapper: css`
    display: flex;
    align-items: flex-end;
    border-radius: 4px;
    padding: 0 10px 0 0;
    max-width: 460px;
    font-weight: var(--font-weight-normal);
    transition: color 0.18s var(--transition-easing-cubic),
      background-color 0.18s var(--transition-easing-cubic),
      border-color 0.18s var(--transition-easing-cubic);

    border: 1px solid var(--color-text-5-o10);
    background-color: var(--color-input-background);
  `,
  input: css`
    flex: 0 0 auto;
    display: inline-block;
    background: transparent;
    border: 0;
    width: auto;
    outline: none;
    padding: 9px 6px 9px 0;
    color: inherit;
  `,
  inputWrapper: css`
    position: relative;

    &:first-of-type > input {
      padding-left: 10px;
    }
  `,
  dot: css`
    position: absolute;
    right: 0;
    bottom: 0;
    padding-bottom: 9px;
    margin-right: 4px;
    margin-left: -4px;
    pointer-events: none;
  `,
  label: css`
    display: inline-block;
    color: var(--color-text-3);
    margin-bottom: 8px;
    ${typo.small}
  `,
};
