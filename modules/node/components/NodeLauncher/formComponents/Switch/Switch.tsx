import { FC } from 'react';
import { styles } from './Switch.styles';

type Props = {
  name: string;
  onPropertyChanged: (e: any) => void;
};

export const Switch: FC<Props> = ({ onPropertyChanged, name }) => {
  return (
    <label>
      <input
        name={name}
        type="checkbox"
        css={styles.input}
        onChange={(e: any) => onPropertyChanged(e)}
      />
      <span className="switch" css={styles.switch}></span>
    </label>
  );
};
