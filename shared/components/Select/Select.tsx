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
  labelClass?: SerializedStyles[];
  inputClass?: SerializedStyles[];
  validationOptions?: RegisterOptions;
  options: { label: string; value: string }[];
};

export function Select({
  label,
  name,
  inputSize,
  inputStyle,
  options,
  labelClass,
  leftIcon,
  disabled,
  validationOptions,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const selectStyles = setInputStyles(
    inputSize,
    inputStyle,
    disabled,
    !!errors[name],
    !!leftIcon,
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
      <div css={[styles.wrappeer]}>
        {leftIcon && <InputUtil position="left">{leftIcon}</InputUtil>}
        <select
          css={[selectStyles]}
          id={name}
          {...register(name, validationOptions)}
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
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
  isValid?: boolean,
  leftIcon?: boolean,
  inputStyles?: SerializedStyles[],
) {
  const fieldClasses = [
    styles.field,
    styles.fieldArrow,
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

  if (!isValid) {
    fieldClasses.push(styles.fieldError);
  }

  return fieldClasses;
}
