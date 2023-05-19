import { SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';
import { styles } from './DropdownMenu.styles';

type Props = {
  isOpen?: boolean;
  children?: ReactNode;
  additionalStyles?: SerializedStyles;
};

export function DropdownMenu({ isOpen, children, additionalStyles }: Props) {
  return (
    <div
      css={[
        styles.menu,
        styles.right,
        additionalStyles && additionalStyles,
        isOpen && styles.isOpen,
      ]}
    >
      {children}
    </div>
  );
}
