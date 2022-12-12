import { ReactNode } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { styles } from './Select.styles';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { InputUtil } from '../Input/InputUtil';
import { SerializedStyles } from '@emotion/react';
import { InputLabel } from '../Input/InputLabel';

type Props = {
  inputSize: InputSize;
  inputStyle: InputStyle;
  label?: string;
  name: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  labelClass?: SerializedStyles[];
  inputClass?: SerializedStyles[];
  validationOptions?: RegisterOptions;
  options: { label: string; value: string }[];
  defaultValue?: any;
};

export function Select({
  label,
  name,
  inputSize,
  inputStyle,
  options,
  labelClass,
  inputClass,
  leftIcon,
  rightIcon,
  disabled,
  validationOptions,
  defaultValue,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const selectStyles = setInputStyles(
    inputSize,
    inputStyle,
    disabled,
    Boolean(errors[name]),
    Boolean(leftIcon),
    inputClass,
    Boolean(rightIcon),
  );

  return (
    <>
      {label && (
        <InputLabel
          css={[labelClass]}
          labelSize={inputSize}
          name={name}
          disabled={disabled}
        >
          {label}
        </InputLabel>
      )}
      <div css={[styles.wrapper]}>
        {leftIcon && <InputUtil position="left">{leftIcon}</InputUtil>}
        <select
          css={[selectStyles]}
          defaultValue={defaultValue}
          id={name}
          {...register(name, validationOptions)}
        >
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {rightIcon && <InputUtil position="right">{rightIcon}</InputUtil>}
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
  inputSize: InputSize,
  inputStyle: InputStyle,
  disabled?: boolean,
  hasError?: boolean,
  leftIcon?: boolean,
  inputStyles?: SerializedStyles[],
  rightIcon?: boolean,
) {
  const fieldClasses = [
    styles.field,
    !rightIcon && styles.fieldArrow,
    styles[inputSize],
    styles[inputStyle],
  ];

  if (inputStyles) {
    fieldClasses.push(...inputStyles);
  }

  if (leftIcon) {
    fieldClasses.push(styles.fieldWithLeftIcon);
  }

  if (disabled) {
    fieldClasses.push(styles.inputFieldDisabled, styles.inputHintsDisabled);
  }

  if (hasError) {
    fieldClasses.push(styles.fieldError);
  }

  return fieldClasses;
}
