import { InputHTMLAttributes, ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

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
import { typo, textColor } from 'styles/utils.typography.styles';
import { spacing } from 'styles/utils.spacing.styles';

export type InputSize = 'small' | 'medium' | 'large';

type InputProps = {
  name: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  hints?: ReactNode;
  labelElement?: ReactNode;
  labelStyles?: SerializedStyles[];
  inputSize?: InputSize;
  validationOptions?: RegisterOptions;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
  name,
  inputSize = 'medium',
  leftIcon,
  rightIcon,
  disabled,
  labelElement,
  labelStyles,
  validationOptions,
  value,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputClasses = setInputStyles(
    inputSize,
    disabled,
    !!errors[name],
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
        <input
          {...register(name, validationOptions)}
          css={[inputClasses]}
          disabled={disabled}
          {...rest}
          name={name}
        />
        <InputUtil position="right">{rightIcon}</InputUtil>
      </div>
      <ErrorMessage
        name={name}
        errors={errors}
        as={<p css={[typo.smaller, textColor.warning, spacing.top.small]} />}
      />
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

  if (isValid) {
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
