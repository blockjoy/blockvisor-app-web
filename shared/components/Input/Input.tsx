import { InputHTMLAttributes, ReactNode } from 'react';
import { InputUtil } from './InputUtil';
import {
  inputWrapper,
  inputField,
  inputFieldDisabled,
  inputTypesStyle,
  inputFieldError,
  inputFieldWithUtilLeft,
  inputFieldWithUtilRight,
  inputFieldDefault,
} from './Input.styles';
import { InputLabel } from './InputLabel';
import { SerializedStyles } from '@emotion/react';

export type InputSize = 'small' | 'medium' | 'large';

type InputProps = {
  name: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  hints?: ReactNode;
  labelElement?: ReactNode;
  labelStyles?: SerializedStyles[];
  inputSize?: InputSize;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
  name,
  inputSize = 'medium',
  leftIcon,
  rightIcon,
  disabled,
  labelElement,
  labelStyles,
  ...rest
}: InputProps) {
  // replace with hook form
  const isValid = true;

  const inputClasses = setInputStyles(
    inputSize,
    disabled,
    isValid,
    !!leftIcon,
    !!rightIcon,
  );

  return (
    <>
      <InputLabel additionalStyles={labelStyles} name={name}>
        {labelElement}
      </InputLabel>
      <div tabIndex={0} css={[inputWrapper]}>
        <InputUtil position="left">{leftIcon}</InputUtil>
        <input css={[inputClasses]} disabled={disabled} {...rest} />
        <InputUtil position="right">{rightIcon}</InputUtil>
      </div>
    </>
  );
}

function setInputStyles(
  version: InputSize,
  disabled?: boolean,
  isValid?: boolean,
  leftIcon?: boolean,
  rightIcon?: boolean,
) {
  const fieldClasses = [
    inputField,
    inputTypesStyle[version],
    inputFieldDefault,
  ];

  if (disabled) {
    fieldClasses.push(inputFieldDisabled);
  }

  if (!isValid) {
    fieldClasses.push(inputFieldError);
  }

  if (leftIcon) {
    fieldClasses.push(inputFieldWithUtilLeft);
  }

  if (rightIcon) {
    fieldClasses.push(inputFieldWithUtilRight);
  }

  return fieldClasses;
}
