import { ReactNode, useRef } from 'react';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { styles } from './DropdownWrapper.styles';

type Props = {
  isEmpty: boolean;
  isOpen: boolean;
  onClose: VoidFunction;
  children: ReactNode;
  noBottomMargin?: boolean;
};

export const DropdownWrapper = ({
  isEmpty,
  isOpen,
  onClose,
  children,
  noBottomMargin,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useClickOutside<HTMLDivElement>(dropdownRef, onClose);

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
