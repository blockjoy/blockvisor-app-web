import { SerializedStyles } from '@emotion/react';
import { InputHTMLAttributes, ReactNode, useEffect } from 'react';
import { isMobileSafari } from 'react-device-detect';
import { RegisterOptions, useFormContext } from 'react-hook-form';
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
  shouldAutoFocus?: boolean;
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
  shouldAutoFocus,
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
    !!errors[name] && value !== '',
    !!leftIcon,
    !!rightIcon,
    inputStyles,
  );

  useEffect(() => {
    if (shouldAutoFocus && !isMobileSafari) {
      setFocus(name);
    }
  }, [shouldAutoFocus]);

  return (
    <>
      {Boolean(label) && (
        <label
          htmlFor={name}
          css={[inputLabel, inputLabelSize.small, labelStyles]}
        >
          {label}
        </label>
      )}
      <div css={[inputWrapper]}>
        <InputUtil position="left">{leftIcon}</InputUtil>
        <input
          css={[inputClasses]}
          disabled={disabled}
          value={value}
          {...rest}
          {...register(name, {
            ...validationOptions,
          })}
        />
        <InputUtil position="right">{rightIcon}</InputUtil>
      </div>
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
