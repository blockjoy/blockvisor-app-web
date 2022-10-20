import { MouseEventHandler, ReactNode, useState } from 'react';
import { SerializedStyles } from '@emotion/react';
import { Pill } from '@shared/components';
import { InputLabel } from '../Input/InputLabel';
import { styles } from './TagsField.styles';
import { PillBox } from '../PillBox/PillBox';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { display } from 'styles/utils.display.styles';

type Props = {
  name: string;
  inputSize: InputSize;
  multiline?: boolean;
  disabled?: boolean;
  limit?: number;
  labelClass?: SerializedStyles[];
  label?: ReactNode;
  value: string;
  validationOptions?: RegisterOptions;
};

export function TagsField({
  name,
  inputSize,
  disabled,
  multiline = false,
  labelClass,
  label,
  value,
  validationOptions,
  limit = 3,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [values, setValues] = useState(() => value.split(',') ?? []);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { pillValue } = e.currentTarget.dataset;

    setValues((prev) => prev.filter((val) => val !== pillValue));
  };

  const inputClasses = setStyles(inputSize, true, multiline);
  const fieldClasses = setFieldStyles(disabled);

  return (
    <>
      <InputLabel name={name} additionalStyles={labelClass} disabled={disabled}>
        {label}
      </InputLabel>
      <div css={inputClasses}>
        <PillBox>
          {values.map((value, idx) => (
            <Pill
              key={idx}
              data-pill-value={value}
              onClick={handleDelete}
              showFull={true}
            >
              {value}
            </Pill>
          ))}
        </PillBox>
        <input
          {...register(name, validationOptions)}
          css={fieldClasses}
          tabIndex={-1}
        />
      </div>
    </>
  );
}

function setStyles(
  inputSize: InputSize,
  isValid?: boolean,
  multiline?: boolean,
) {
  const baseStyles = [styles.wrapper, styles[inputSize]];

  if (!isValid) {
    baseStyles.push(styles.error);
  }

  if (multiline) {
    baseStyles.push(styles.multiline);
  }

  return baseStyles;
}

function setFieldStyles(disabled?: boolean) {
  const baseStyles = [display.visuallyHidden, styles.field];

  if (disabled) {
    baseStyles.push(styles.disabled);
  }

  return baseStyles;
}
