import { Fragment, KeyboardEvent } from 'react';
import { styles } from './PillPicker.styles';

type PillPickerProps<T = any> = {
  name: string;
  items: T[];
  selectedItem?: T;
  isCompact?: boolean;
  noBottomMargin?: boolean;
  onChange: (item: T) => void;
};

export const PillPicker = <
  T extends { id?: string; name?: string; isDisabled?: boolean },
>({
  name,
  items,
  selectedItem,
  isCompact,
  noBottomMargin,
  onChange,
}: PillPickerProps<T>) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, item: T) => {
    if (e.key === 'Enter') onChange(item);
  };

  return (
    <div css={[styles.wrapper, noBottomMargin && styles.wrapperNoBottomMargin]}>
      {items.map((item) => (
        <Fragment key={item.id}>
          <input
            css={styles.input}
            name={name + item.name}
            id={name + item.name}
            type="radio"
            onChange={() => onChange(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
            checked={item.id === selectedItem?.id}
            value={item.id}
            disabled={item.isDisabled}
          />
          <label
            htmlFor={name + item.name}
            css={[styles.label, isCompact && styles.labelCompact]}
          >
            <span css={[styles.button, isCompact && styles.buttonCompact]}>
              {item.name}
            </span>
          </label>
        </Fragment>
      ))}
    </div>
  );
};
