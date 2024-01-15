import { ChangeEvent, FC } from 'react';
import { styles } from './Textbox.styles';

type Props = {
  isRequired: boolean;
  defaultValue?: string;
  name: string;
  tabIndex?: number;
  type: string;
  onPropertyChanged: (name: string, value: string) => void;
};

export const Textbox: FC<Props> = ({
  onPropertyChanged,
  defaultValue = '',
  name,
  isRequired,
  type = 'text',
  tabIndex,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onPropertyChanged(e.target.name, e.target.value);

  return (
    <input
      tabIndex={tabIndex}
      name={name}
      type={type}
      defaultValue={defaultValue}
      autoComplete={type === 'password' ? 'new-password' : 'off'}
      css={[styles.input, isRequired && styles.inputRequired]}
      placeholder="Enter a value"
      onChange={handleChange}
    />
  );
};
