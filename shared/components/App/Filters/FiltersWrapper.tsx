import IconPlus from '@public/assets/icons/plus-12.svg';
import IconMinus from '@public/assets/icons/minus-12.svg';
import { MouseEvent, ReactNode } from 'react';
import { styles } from './FiltersWrapper.styles';

type FiltersWrapperProps = {
  children: ReactNode;
  name: string;
  isOpen: boolean;
  isDisabled?: boolean;
  onPlusMinusClicked: (filterName: string, args1: boolean) => void;
  onFilterBlockClicked: (name: string) => void;
};

export const FiltersWrapper = ({
  children,
  name,
  isOpen,
  isDisabled,
  onPlusMinusClicked,
  onFilterBlockClicked,
}: FiltersWrapperProps) => {
  const handleMinusClicked = (e: MouseEvent<HTMLLabelElement>) => {
    if (!isDisabled) {
      e.stopPropagation();
      onPlusMinusClicked(name, isOpen);
    }
  };

  const handleFilterBlockClicked = (name: string) => {
    if (!isDisabled) {
      onFilterBlockClicked(name);
    }
  };

  return (
    <div
      css={[styles.filterBlock, isDisabled && styles.filterBlockDisabled]}
      onClick={() => handleFilterBlockClicked(name)}
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
