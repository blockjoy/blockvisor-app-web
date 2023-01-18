import { FC } from 'react';
import { styles } from './PillPicker.styles';

type Props = {
  name?: string;
  items: string[];
  selectedItem: string;
  onChange: (item: string) => void;
};

export const PillPicker: FC<Props> = ({
  name = 'pills',
  items,
  selectedItem,
  onChange,
}) => {
  console.log('selectedItem', selectedItem);

  return (
    <div css={styles.wrapper}>
      {items.map((item) => (
        <label key={item} css={styles.label}>
          <input
            css={styles.input}
            name={name}
            type="radio"
            onChange={() => onChange(item)}
            checked={item === selectedItem}
            value={item}
          />
          <span css={styles.button}>{item}</span>
        </label>
      ))}
    </div>
  );
};
