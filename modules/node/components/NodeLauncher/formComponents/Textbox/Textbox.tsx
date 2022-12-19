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
      onChange={(e: any) => onPropertyChanged(e)}
    />
  );
};
