import { css, SerializedStyles } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';

const inputWrapper = css`
  position: relative;
  color: var(--color-text-3);
`;

const inputField = css`
  border-radius: 4px;
  width: 100%;
  font-weight: var(--font-weight-normal);
  color: inherit;
  transition: color 0.18s var(--transition-easing-cubic),
    background-color 0.18s var(--transition-easing-cubic),
    border-color 0.18s var(--transition-easing-cubic);

  &:focus {
    outline: 0;
    border-color: var(--color-text-5-o30);
    color: var(--color-text-5);
  }
`;

const inputFieldDefault = css`
  border: 1px solid var(--color-text-5-o10);
  background-color: var(--color-input-background);
`;

const inputFieldOutline = css`
  background-color: transparent;
  border: 1px solid var(--color-text-5-o10);

  &:hover {
    border-color: var(--color-text-2);
  }

  &:focus {
    border-color: var(--color-text-4);
    outline: 0;
  }
`;

const inputFieldError = css`
  border-color: var(--color-utility-warning);
`;

const inputTypesStyle: Record<InputSize, SerializedStyles> = {
  small: css`
    ${typo.small}
    padding: 5px 12px;
  `,
  medium: css`
    ${typo.small}
    padding: 9px 12px;
  `,
  large: css`
    ${typo.small}
    padding: 15px 12px;
  `,
};

const inputFieldWithUtilLeft = css`
  padding-left: 36px;
`;

const inputFieldWithUtilRight = css`
  padding-right: 36px;
`;

const inputFieldDisabled = css`
  opacity: 0.4;
  cursor: not-allowed;
  user-select: none;
`;

export {
  inputField,
  inputFieldDefault,
  inputFieldDisabled,
  inputFieldError,
  inputFieldOutline,
  inputTypesStyle,
  inputFieldWithUtilLeft,
  inputFieldWithUtilRight,
  inputWrapper,
};
