import { FC, Fragment } from 'react';
import { styles } from './PillPicker.styles';

type Props = {
  name?: string;
  items: string[];
  selectedItem: string;
  tabIndexStart?: number;
  onChange: (item: string) => void;
};

export const PillPicker: FC<Props> = ({
  name = 'pills',
  items,
  selectedItem,
  onChange,
  tabIndexStart,
}) => {
  // const handleFocus = (e: any) => {
  //   e.preventDefault();
  // };

  console.log('selectedItem', selectedItem);

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
            onChange={() => onChange(item)}
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
