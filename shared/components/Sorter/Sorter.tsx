import { FC, useEffect, useState } from 'react';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './Sorter.styles';
import { SorterValues } from './SorterValues';
import IconSort from '@public/assets/icons/sort-12.svg';

const SORTER_VALUES: SorterValues[] = ['none', 'asc', 'desc'];

interface Props {
  id: string;
  active: {
    id: string;
    value: SorterValues;
  };
  callback: (id: string, value: SorterValues) => void;
}

export const Sorter: FC<Props> = ({ id, active, callback }) => {
  const [activeDirection, setActiveDirection] = useState<number>(0);

  useEffect(() => {
    if (active.id !== id) {
      setActiveDirection(0);
    }
  }, [active.id]);

  function handleClick() {
    let newValue = activeDirection + 1;

    if (newValue > SORTER_VALUES.length - 1) {
      newValue = 0;
    }

    setActiveDirection(newValue);

    callback(id, SORTER_VALUES[newValue]);
  }

  const classes = [reset.button, typo.microlabel, typo.uppercase, styles.base];

  return (
    <button
      onClick={handleClick}
      css={[classes, active.id === id && styles[active.value]]}
    >
      <span className="visually-hidden">Sort by </span>
      <slot />
      <IconSort class="sorter__arrow" />
    </button>
  );
};
