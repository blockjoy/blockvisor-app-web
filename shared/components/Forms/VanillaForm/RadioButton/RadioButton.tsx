import { ChangeEventHandler } from 'react';
import { styles } from './RadioButton.styles';

type RadioButtonProps = {
  name: string;
  id: string;
  label?: React.ReactNode;
  description?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: any;
  selectedValue: any;
} & React.PropsWithChildren;

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
