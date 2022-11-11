import { css } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';

export const styles = {
  inputWrapper: css`
    display: block;
  `,
  wrapper: css`
    position: relative;
    color: var(--color-text-3);
  `,
  field: css`
    width: 100%;
    border-radius: 4px;
    color: inherit;
    cursor: pointer;
    transition: color 0.18s var(--transition-easing-cubic),
      border-color 0.2s var(--transition-easing-cubic);

    &:focus,
    &:active,
    &:hover {
      color: var(--color-text-5);
    }
  `,
  default: css`
    background-color: var(--color-input-background);
    font-weight: var(--font-weight-normal);
    border: 1px solid var(--color-input-background);
  `,
  outline: css`
    background-color: var(--color-input-background);
    border: 1px solid var(--color-text-2);
    border-radius: 4px;
    color: var(--color-text-5);
    font-weight: var(--font-weight-bold);
  `,
  fieldArrow: css`
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'><path stroke='%23F8FAF6' d='m5 7 2.828 2.828L10.657 7'/></svg>");
  `,
  fieldError: css`
    border-color: var(--color-utility-warning);
  `,
  small: css`
    ${typo.small}
    padding: 6px 48px 6px 12px;
  `,
  medium: css`
    ${typo.small}
    padding: 10px 48px 10px 12px;
  `,
  large: css`
    ${typo.base}
    padding: 16px 48px 16px 12px;
  `,
  fieldWithLeftIcon: css`
    padding-left: 36px;
  `,
  inputUtil: css`
    color: var(--color-text-3);
    fill: var(--color-text-3);
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);

    & :global(svg-path) {
      fill: currentColor;
    }
  `,
  inputUtilLeft: css`
    left: 12px;
  `,

  inputHints: css`
    ${typo.small}
    margin-top: 4px;
  `,

  inputHintsDescription: css`
    color: var(--color-text-3);
  `,
  inputFieldDisabled: css`
    opacity: 0.4;
    cursor: not-allowed;
    user-select: none;
  `,
  inputHintsDisabled: css`
    opacity: 0.4;
    cursor: not-allowed;
    user-select: none;
  `,
};
