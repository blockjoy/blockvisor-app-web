import { FC } from 'react';
import { styles } from './Textbox.styles';

type Props = {
  isRequired: boolean;
  name: string;
  onPropertyChanged: (e: any) => void;
};

export const Textbox: FC<Props> = ({ onPropertyChanged, name, isRequired }) => {
  return (
    <input
      name={name}
      type="text"
      css={[styles.input, isRequired && styles.inputRequired]}
      placeholder="Enter a value"
      onChange={(e: any) => onPropertyChanged(e)}
    />
  );
};
