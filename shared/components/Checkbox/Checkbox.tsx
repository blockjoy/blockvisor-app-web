import { InputHTMLAttributes, ReactNode } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { display } from 'styles/utils.display.styles';

type Props = {
  name: string;
  label?: ReactNode;
  description?: string;
  formTouched?: boolean;
  validationOptions?: RegisterOptions;
} & InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({
  label,
  name,
  validationOptions,
  formTouched = false,
  description = '',
  ...rest
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <input
        {...register(name, validationOptions)}
        //class:checkbox__input--touched={formTouched}
        className="checkbox__input"
        css={[display.visuallyHidden]}
        id={name}
        type="checkbox"
        {...rest}
      />
      <label className={'checkboxClasses'} htmlFor={name}>
        <slot />
      </label>
    </>
  );
}
