import { useClickOutside } from '@shared/hooks/useClickOutside';
import { ReactNode, useRef } from 'react';
import { styles } from './DropdownWrapper.styles';

type Props = {
  isEmpty: boolean;
  isOpen: boolean;
  onClose: VoidFunction;
  children: ReactNode;
};

export const DropdownWrapper = ({
  isEmpty,
  isOpen,
  onClose,
  children,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useClickOutside<HTMLDivElement>(dropdownRef, onClose);
  return (
    <div
      className={`${!isEmpty ? 'not-empty' : ''} ${isOpen ? 'is-open' : ''}`}
      css={[styles.wrapper]}
      ref={dropdownRef}
    >
      {children}
    </div>
  );
};
