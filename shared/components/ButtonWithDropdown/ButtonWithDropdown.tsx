import { ReactNode, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import DotsIcon from '@public/assets/icons/dots-12.svg';
import { styles } from './ButtonWithDropdown.styles';
import { useClickOutside } from '@shared/hooks/useClickOutside';

type Props = {
  children?: ReactNode;
};

export function ButtonWithDropdown({ children }: Props) {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => setOpen(false);
  useClickOutside<HTMLDivElement>(dropdownRef, handleClickOutside);

  return (
    <div ref={dropdownRef} css={[styles.base]}>
      <Button onClick={() => setOpen(!isOpen)} size="small" style="ghost">
        <DotsIcon />
      </Button>
      <div css={[styles.menu, styles.right, isOpen && styles.isOpen]}>
        {children}
      </div>
    </div>
  );
}
