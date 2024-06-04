import { Fragment, KeyboardEvent } from 'react';
import { styles } from './PillPicker.styles';

type PillPickerProps = {
  name: string;
  items: string[];
  selectedItem: string;
  isCompact?: boolean;
  noBottomMargin?: boolean;
  onChange: (name: string, item: string) => void;
};

export const PillPicker = ({
  name,
  items,
  selectedItem,
  isCompact,
  noBottomMargin,
  onChange,
}: PillPickerProps) => {
  const handleChange = (item: string) => onChange(name, item);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, item: string) => {
    if (e.key === 'Enter') handleChange(item);
  };

  return (
    <div css={[styles.wrapper, noBottomMargin && styles.wrapperNoBottomMargin]}>
      {items.map((item) => (
        <Fragment key={item}>
          <input
            css={styles.input}
            name={name + item}
            id={name + item}
            type="radio"
            onChange={() => handleChange(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
            checked={item === selectedItem}
            value={item}
          />
          <label
            htmlFor={name + item}
            css={[styles.label, isCompact && styles.labelCompact]}
          >
            <span css={[styles.button, isCompact && styles.buttonCompact]}>
              {item}
            </span>
          </label>
        </Fragment>
      ))}
    </div>
  );
};
