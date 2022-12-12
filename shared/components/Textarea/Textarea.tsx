import { ReactNode, TextareaHTMLAttributes } from 'react';
import { SerializedStyles } from '@emotion/react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { InputLabel } from '../Input/InputLabel';
import { styles } from './Textarea.styles';
import { ErrorMessage } from '@hookform/error-message';
import { typo } from 'styles/utils.typography.styles';
import { colors } from 'styles/utils.colors.styles';
import { spacing } from 'styles/utils.spacing.styles';

type Props = {
  inputSize?: InputSize;
  name: string;
  description?: string;
  labelClass?: SerializedStyles[];
  label: ReactNode;
  validationOptions?: RegisterOptions;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>;

export function Textarea({
  inputSize = 'medium',
  description = '',
  labelClass,
  validationOptions,
  label,
  disabled,
  name,
  ...rest
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const textAreaStyles = setInputStyles(inputSize, disabled, !errors[name]);
  return (
    <>
      <InputLabel
        labelSize={inputSize}
        additionalStyles={labelClass}
        name={name}
        disabled={disabled}
      >
        {label}
      </InputLabel>
      <div css={[styles.wrapper]}>
        <textarea
          css={[textAreaStyles]}
          disabled={disabled}
          {...register(name, validationOptions)}
          id={name}
          {...rest}
        />
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
  disabled?: boolean,
  isValid?: boolean,
) {
  const fieldClasses = [styles.field, styles[inputSize]];

  if (!isValid) {
    fieldClasses.push(styles.fieldError);
  }

  if (disabled) {
    fieldClasses.push(styles.fieldDisabled);
  }

  return fieldClasses;
}
