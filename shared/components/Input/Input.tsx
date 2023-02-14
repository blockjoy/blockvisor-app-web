import { SerializedStyles } from '@emotion/react';
import { ErrorMessage } from '@hookform/error-message';
import { forwardRef, InputHTMLAttributes, ReactNode, useEffect } from 'react';
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
  inputStyles?: SerializedStyles[];
  inputSize?: InputSize;
  validationOptions?: RegisterOptions;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  name,
  inputSize = 'medium',
  leftIcon,
  rightIcon,
  disabled,
  label,
  labelStyles,
  validationOptions,
  inputStyles,
  value,
  ...rest
}: InputProps) => {
  const {
    register,
    formState: { errors },
    setFocus,
  } = useFormContext();

  const inputClasses = setInputStyles(
    inputSize,
    disabled,
    !!errors[name],
    !!leftIcon,
    !!rightIcon,
    inputStyles,
  );

  useEffect(() => {
    if (rest.autoFocus) {
      setFocus(name);
    }
  }, [rest.autoFocus]);

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
};

function setInputStyles(
  version: InputSize,
  disabled?: boolean,
  isValid?: boolean,
  leftIcon?: boolean,
  rightIcon?: boolean,
  inputStyles?: SerializedStyles[],
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

  if (inputStyles) {
    fieldClasses.push(...inputStyles);
  }

  return fieldClasses;
}
