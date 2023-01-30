import { css, SerializedStyles } from '@emotion/react';
import { ITheme } from 'types/theme';

const inputWrapper = css`
  position: relative;
  color: var(--color-text-3);
`;

const inputField = css`
  border-radius: 4px;
  width: 100%;
  font-weight: var(--font-weight-normal);
  font-size: 16px;
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
    padding: 8px 12px;
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

const inputFieldDisabled = (theme: ITheme) => css`
  -webkit-text-fill-color: ${theme.colorDefault};
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
