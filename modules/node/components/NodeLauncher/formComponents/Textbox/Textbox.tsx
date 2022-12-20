import { FC } from 'react';
import { styles } from './Textbox.styles';

type Props = {
  name: string;
  onPropertyChanged: (e: any) => void;
};

export const Textbox: FC<Props> = ({ onPropertyChanged, name }) => {
  return (
    <input
      name={name}
      type="text"
      css={styles.input}
      placeholder="Enter a value"
      onChange={(e: any) => onPropertyChanged(e)}
    />
  );
};
