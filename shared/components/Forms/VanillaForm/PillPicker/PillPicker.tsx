import { FC, Fragment } from 'react';
import { styles } from './PillPicker.styles';

type Props = {
  name: string;
  items: string[];
  selectedItem: string;
  tabIndexStart?: number;
  onChange: (name: string, item: string) => void;
};

export const PillPicker: FC<Props> = ({
  name,
  items,
  selectedItem,
  onChange,
  tabIndexStart,
}) => {
  const handleChange = (item: string) => {
    onChange(name, item);
  };

  return (
    <div css={styles.wrapper}>
      {items
        .filter((item, index) => items.indexOf(item) === index)
        .map((item, index) => (
          <Fragment key={item}>
            <input
              tabIndex={tabIndexStart! + index}
              css={styles.input}
              name={item}
              id={item}
              type="radio"
              onChange={() => handleChange(item)}
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
