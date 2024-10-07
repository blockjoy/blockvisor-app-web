import { RefObject } from 'react';
import { SerializedStyles } from '@emotion/react';
import { useClickOutside } from '@shared/index';
import { styles } from './DropdownMenu.styles';

type Props = {
  isOpen: boolean;
  dropdownMenuRef?: RefObject<HTMLDivElement>;
  additionalStyles?: SerializedStyles[] | SerializedStyles;
  shouldClickOutside?: boolean;
  handleClose?: VoidFunction;
} & React.PropsWithChildren;

export const DropdownMenu = ({
  children,
  isOpen,
  dropdownMenuRef,
  additionalStyles,
  shouldClickOutside = false,
  handleClose,
}: Props) => {
  useClickOutside<HTMLDivElement>(
    dropdownMenuRef!,
    handleClose ?? (() => {}),
    shouldClickOutside && Boolean(dropdownMenuRef),
  );

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
};
