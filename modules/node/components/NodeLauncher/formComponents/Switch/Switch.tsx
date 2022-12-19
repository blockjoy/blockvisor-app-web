import { FC } from 'react';
import { styles } from './Switch.styles';

type Props = {
  name: string;
  onPropertyChanged: (e: any) => void;
};

export const Switch: FC<Props> = ({ onPropertyChanged, name }) => {
  return (
    <input
      name={name}
      type="checkbox"
      css={styles.input}
      onChange={(e: any) => onPropertyChanged(e)}
    />
  );
};
