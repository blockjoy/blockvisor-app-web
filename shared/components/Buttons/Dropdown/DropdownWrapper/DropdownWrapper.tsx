import { useRef } from 'react';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { styles } from './DropdownWrapper.styles';

type Props = {
  isEmpty?: boolean;
  isOpen: boolean;
  onClose: VoidFunction;
  noBottomMargin?: boolean;
  isInPortal?: boolean;
} & React.PropsWithChildren;

export const DropdownWrapper = ({
  isEmpty,
  isOpen,
  onClose,
  children,
  noBottomMargin,
  isInPortal = false,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useClickOutside<HTMLDivElement>(dropdownRef, onClose, !isInPortal);

  return (
    <div
      className={`${!isEmpty ? 'not-empty' : ''} ${isOpen ? 'is-open' : ''}`}
      css={[styles.wrapper, noBottomMargin && styles.wrapperNoBottomMargin]}
      ref={dropdownRef}
    >
      {children}
    </div>
  );
};
