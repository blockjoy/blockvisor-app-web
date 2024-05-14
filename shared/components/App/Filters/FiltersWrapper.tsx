import { MouseEvent, ReactNode } from 'react';
import IconPlus from '@public/assets/icons/common/Plus.svg';
import IconMinus from '@public/assets/icons/common/Minus.svg';
import { styles } from './FiltersWrapper.styles';

type FiltersWrapperProps = {
  children: ReactNode;
  id: string;
  name: string;
  isOpen: boolean;
  isDisabled?: boolean;
  onPlusMinusClicked: (filterName: string, args1: boolean) => void;
  onFilterBlockClicked: (name: string) => void;
};

export const FiltersWrapper = ({
  children,
  id,
  name,
  isOpen,
  isDisabled,
  onPlusMinusClicked,
  onFilterBlockClicked,
}: FiltersWrapperProps) => {
  const handleMinusClicked = (e: MouseEvent<HTMLLabelElement>) => {
    if (isDisabled) return;

    e.stopPropagation();
    onPlusMinusClicked(id, isOpen);
  };

  const handleFilterBlockClicked = () => {
    if (isDisabled) return;
    onFilterBlockClicked(id);
  };

  return (
    <div
      css={[styles.filterBlock, isDisabled && styles.filterBlockDisabled]}
      onClick={handleFilterBlockClicked}
    >
      <label css={styles.labelHeader} onClick={handleMinusClicked}>
        <span css={styles.labelText}>{name}</span>
        {!isDisabled && (
          <a css={styles.labelIcon}>{isOpen ? <IconMinus /> : <IconPlus />}</a>
        )}
      </label>
      <div css={[styles.checkboxList, styles.checkboxListShowAll]}>
        {children}
      </div>
    </div>
  );
};
