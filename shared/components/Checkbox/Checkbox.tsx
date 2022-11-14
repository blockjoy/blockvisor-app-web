import {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import { display } from 'styles/utils.display.styles';
import { styles } from './Checkbox.styles';

type Props = {
  name: string;
  label?: ReactNode;
  description?: string;
  formTouched?: boolean;
  checked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
};

export function Checkbox({
  label,
  name,
  formTouched = false,
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
        id={name}
        defaultChecked={checked}
        type="checkbox"
        {...rest}
        onChange={onChange}
      />
      <label css={[styles.base, checked ? styles.input : '']} htmlFor={name}>
        {children}
      </label>
    </>
  );
}
