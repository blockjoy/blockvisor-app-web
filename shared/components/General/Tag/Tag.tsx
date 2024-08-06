import { MouseEvent } from 'react';
import { styles } from './Tag.styles';
import { SvgIcon } from '@shared/components';
import IconClose from '@public/assets/icons/common/Close.svg';

type Props = {
  name: string;
  onRemove?: (name: string) => void;
};

export const Tag = ({ name, onRemove }: Props) => {
  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove?.(name);
  };

  return (
    <span css={styles.tag}>
      {name}
      <button
        css={styles.removeButton}
        type="button"
        onClick={(e: MouseEvent<HTMLButtonElement>) => handleRemove(e)}
      >
        <SvgIcon isDefaultColor size="12px">
          <IconClose />
        </SvgIcon>
      </button>
    </span>
  );
};
