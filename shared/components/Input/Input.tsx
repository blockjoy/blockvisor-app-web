import { SerializedStyles } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';
import { InputHTMLAttributes, ReactNode } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import {
  inputField,
  inputFieldDefault,
  inputFieldDisabled,
  inputFieldError,
  inputFieldWithUtilLeft,
  inputFieldWithUtilRight,
  inputTypesStyle,
  inputWrapper,
} from './Input.styles';
import { inputLabel, inputLabelSize } from './InputLabel.styles';
import { InputUtil } from './InputUtil';

type InputProps = {
  name: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  hints?: ReactNode;
  label?: string;
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
  label,
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
      <label
        htmlFor={name}
        css={[inputLabel, inputLabelSize.small, labelStyles]}
      >
        {label}
      </label>
      <div css={[inputWrapper]}>
        <InputUtil position="left">{leftIcon}</InputUtil>
        <input
          {...register(name, validationOptions)}
          css={[inputClasses]}
          disabled={disabled}
          value={value}
          {...rest}
          name={name}
        />
        <InputUtil position="right">{rightIcon}</InputUtil>
      </div>
      <ErrorMessage
        name={name}
        errors={errors}
        as={<p css={[typo.smaller, colors.warning, spacing.top.small]} />}
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
