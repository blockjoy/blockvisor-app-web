import { css, SerializedStyles } from '@emotion/react';
import { ITheme } from 'types/theme';

const inputWrapper = css`
  position: relative;
  color: var(--color-text-3);
`;

const inputField = (theme: ITheme) => css`
  border-radius: 4px;
  width: 100%;
  font-weight: var(--font-weight-normal);
  font-size: 16px;
  color: var(--color-text-5);
  transition: color 0.18s var(--transition-easing-cubic),
    background-color 0.18s var(--transition-easing-cubic),
    border-color 0.18s var(--transition-easing-cubic);

  &:focus {
    outline: 0;
    border-color: var(--color-text-5-o30);
    color: var(--color-text-5);
  }

  ::placeholder {
    color: ${theme.colorPlaceholder};
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
  &,
  &:focus {
    border-color: var(--color-utility-warning);
  }
`;

const inputTypesStyle: Record<InputSize, SerializedStyles> = {
  small: css`
    padding: 0 12px;
    height: 32px;
  `,
  medium: css`
    padding: 12px 12px;
  `,
  large: css`
    padding: 16px 12px;
  `,
};

const inputFieldWithUtilLeft = css`
  padding-left: 36px;
`;

const inputFieldWithUtilRight = css`
  padding-right: 36px;
`;

const inputFieldDisabled = css`
  -webkit-text-fill-color: var(--color-text-3);
  opacity: 1;
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
