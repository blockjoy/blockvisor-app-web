import { ReactNode } from 'react';
import { styles } from './Dropdown.styles';

type Props = {
  isOpen?: boolean;
  children?: ReactNode;
};

export function Dropdown({ isOpen, children }: Props) {
  return (
    <div css={[styles.menu, styles.right, isOpen && styles.isOpen]}>
      {children}
    </div>
  );
}
