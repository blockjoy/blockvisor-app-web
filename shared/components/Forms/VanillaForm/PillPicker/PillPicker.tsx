import { Fragment, KeyboardEvent } from 'react';
import { styles } from './PillPicker.styles';

type PillPickerProps = {
  name: string;
  items: string[];
  selectedItem: string;
  tabIndexStart?: number;
  onChange: (name: string, item: string) => void;
};

export const PillPicker = ({
  name,
  items,
  selectedItem,
  onChange,
  tabIndexStart,
}: PillPickerProps) => {
  const handleChange = (item: string) => onChange(name, item);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, item: string) => {
    if (e.key === 'Enter') handleChange(item);
  };

  return (
    <div css={styles.wrapper}>
      {items.map((item, index) => (
        <Fragment key={item}>
          <input
            tabIndex={tabIndexStart! + index}
            css={styles.input}
            name={item}
            id={item}
            type="radio"
            onChange={() => handleChange(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
            checked={item === selectedItem}
            value={item}
          />
          <label htmlFor={item} css={styles.label}>
            <span css={styles.button}>{item}</span>
          </label>
        </Fragment>
      ))}
    </div>
  );
};
