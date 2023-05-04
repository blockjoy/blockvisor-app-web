import { FC } from 'react';
import { styles } from './Textbox.styles';

type Props = {
  isRequired: boolean;
  name: string;
  tabIndex?: number;
  type: string;
  onPropertyChanged: (e: any) => void;
};

export const Textbox: FC<Props> = ({
  onPropertyChanged,
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
      autoComplete={type === 'password' ? 'new-password' : 'off'}
      css={[styles.input, isRequired && styles.inputRequired]}
      placeholder="Enter a value"
      onChange={(e: any) => onPropertyChanged(e)}
    />
  );
};
