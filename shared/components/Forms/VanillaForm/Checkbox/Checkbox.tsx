import { ChangeEvent, ChangeEventHandler, ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';
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
  additionalStyles?: SerializedStyles[];
};

export function Checkbox({
  label,
  id,
  name,
  formTouched = false,
  checked,
  disabled = false,
  onChange,
  children,
  description = '',
  additionalStyles,
  ...rest
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange(e);
  };

  return (
    <>
      <input
        css={[display.visuallyHidden, styles.input]}
        id={id}
        name={name}
        defaultChecked={checked}
        disabled={disabled}
        type="checkbox"
        {...rest}
        onChange={handleChange}
      />
      <label
        css={[
          styles.base,
          checked ? styles.checked : '',
          disabled ? styles.disabled : '',
          additionalStyles && additionalStyles,
        ]}
        htmlFor={id}
      >
        {children}
      </label>
    </>
  );
}
