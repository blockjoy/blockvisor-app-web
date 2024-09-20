import { SerializedStyles } from '@emotion/react';
import { RefObject } from 'react';
import { styles } from './DropdownMenu.styles';

type Props = {
  isOpen?: boolean;
  additionalStyles?: SerializedStyles[] | SerializedStyles;
  dropdownMenuRef?: RefObject<HTMLDivElement>;
} & React.PropsWithChildren;

export function DropdownMenu({
  isOpen,
  dropdownMenuRef,
  children,
  additionalStyles,
}: Props) {
  return (
    <div
      ref={dropdownMenuRef}
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
