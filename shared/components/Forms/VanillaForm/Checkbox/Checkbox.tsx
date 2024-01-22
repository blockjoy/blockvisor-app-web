import { SerializedStyles } from '@emotion/react';
import { ChangeEvent, ChangeEventHandler, ReactNode } from 'react';
import { display } from 'styles/utils.display.styles';
import { styles } from './Checkbox.styles';

type Props = {
  name: string;
  id?: string;
  label?: ReactNode;
  description?: string;
  formTouched?: boolean;
  checked?: boolean;
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
        css={[display.visuallyHidden]}
        id={id}
        name={name}
        defaultChecked={checked}
        type="checkbox"
        {...rest}
        onChange={handleChange}
      />
      <label
        css={[
          styles.base,
          checked ? styles.input : '',
          additionalStyles && additionalStyles,
        ]}
        htmlFor={id}
      >
        {children}
      </label>
    </>
  );
}
