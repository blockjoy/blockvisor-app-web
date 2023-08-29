import { ChangeEvent, FC } from 'react';
import { styles } from './Textbox.styles';

type Props = {
  isRequired: boolean;
  defaultValue?: string;
  name: string;
  tabIndex?: number;
  type: string;
  onPropertyChanged: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Textbox: FC<Props> = ({
  onPropertyChanged,
  defaultValue = '',
  name,
  isRequired,
  type = 'text',
  tabIndex,
}) => {
  return (
    <input
      tabIndex={tabIndex}
      name={name}
      type={type}
      defaultValue={defaultValue}
      autoComplete={type === 'password' ? 'new-password' : 'off'}
      css={[styles.input, isRequired && styles.inputRequired]}
      placeholder="Enter a value"
      onChange={(e: ChangeEvent<HTMLInputElement>) => onPropertyChanged(e)}
    />
  );
};
