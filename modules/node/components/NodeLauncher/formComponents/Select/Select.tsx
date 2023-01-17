import { FC } from 'react';
import { styles } from '../Select/Select.styles';

type Props = {
  items: string[];
  onPropertyChanged: (e: any) => void;
};

export const Select: FC<Props> = ({ onPropertyChanged, items }) => {
  return (
    <select
      autoComplete="off"
      css={[styles.input]}
      placeholder="Enter a value"
      onChange={(e: any) => onPropertyChanged(e)}
    >
      {items?.map((item) => (
        <option value={item}>{item}</option>
      ))}
    </select>
  );
};
