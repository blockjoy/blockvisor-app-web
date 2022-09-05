import { css } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';

export const styles = {
  wrapper: css`
    position: relative;
    color: var(--color-text-3);
  `,
  field: css`
    display: block;
    background-color: var(--color-input-background);
    border-radius: 4px;
    font-weight: var(--font-weight-normal);
    color: inherit;
    padding: 12px 8px 12px 12px;
    border: 1px solid var(--color-text-5-o10);
    transition: color 0.18s var(--transition-easing-cubic),
      border-color 0.2s var(--transition-easing-cubic);
    border: 1px solid var(--color-input-background);

    &:focus {
      color: var(--color-text-5);
      outline: 0;
      border-color: var(--color-text-5-o30);
    }
  `,
  fieldError: css`
    border: 1px solid var(--color-utility-warning);
  `,
  label: css`
    display: inline-block;
    color: var(--color-text-5);
    margin-bottom: 4px;
  `,
  labelSmall: css`
    ${typo.tiny}
  `,
  labelMedium: css`
    ${typo.small}
  `,
  labelLarge: css`
    ${typo.base}
  `,
  small: css`
    ${typo.small}
  `,
  medium: css`
    ${typo.small}
  `,
  large: css`
    ${typo.base}
  `,
  labelDisabled: css`
    opacity: 0.4;
    cursor: not-allowed;
    user-select: none;
  `,
  fieldDisabled: css`
    opacity: 0.4;
    cursor: not-allowed;
    user-select: none;
  `,
};
