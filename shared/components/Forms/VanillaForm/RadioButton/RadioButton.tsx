import { ChangeEventHandler, ReactNode } from 'react';
import { styles } from './RadioButton.styles';

type RadioButtonProps = {
  name: string;
  id: string;
  label?: ReactNode;
  description?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
  value: any;
  selectedValue: any;
};

export const RadioButton = ({
  name,
  id,
  label,
  onChange,
  children,
  description = '',
  value,
  selectedValue,
  ...rest
}: RadioButtonProps) => {
  return (
    <label
      css={styles.wrapper}
      className={value === selectedValue ? 'active' : ''}
    >
      <input
        type="radio"
        value={value}
        checked={value === selectedValue}
        {...rest}
        onChange={onChange}
        css={styles.input}
      />
      {children}
    </label>
  );
};
