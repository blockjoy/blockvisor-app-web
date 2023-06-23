import { ChangeEventHandler, ReactNode } from 'react';
import { display } from 'styles/utils.display.styles';
import { styles } from './Checkbox.styles';

type Props = {
  name: string;
  id?: string;
  label?: ReactNode;
  description?: string;
  formTouched?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
};

export function Checkbox({
  label,
  id,
  name,
  formTouched = false,
  disabled = false,
  checked,
  onChange,
  children,
  description = '',
  ...rest
}: Props) {
  return (
    <>
      <input
        css={[display.visuallyHidden]}
        id={id}
        name={name}
        disabled={disabled}
        defaultChecked={checked}
        type="checkbox"
        {...rest}
        onChange={onChange}
      />
      <label
        css={[
          styles.base,
          checked ? styles.input : '',
          disabled ? styles.disabled : '',
        ]}
        htmlFor={id}
      >
        {children}
      </label>
    </>
  );
}
