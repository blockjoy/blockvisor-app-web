import { RefObject, useLayoutEffect, useState } from 'react';
import { SerializedStyles } from '@emotion/react';
import { useClickOutside } from '@shared/index';
import { styles } from './DropdownMenu.styles';

type Props = {
  isOpen: boolean;
  dropdownMenuRef?: RefObject<HTMLDivElement>;
  additionalStyles?: SerializedStyles[] | SerializedStyles;
  isInPortal?: boolean;
  handleClose?: VoidFunction;
} & React.PropsWithChildren;

export const DropdownMenu = ({
  children,
  isOpen,
  dropdownMenuRef,
  additionalStyles,
  isInPortal = false,
  handleClose,
}: Props) => {
  const [isEntered, setIsEntered] = useState(false);

  useClickOutside<HTMLDivElement>(
    dropdownMenuRef!,
    handleClose ?? (() => {}),
    isInPortal && Boolean(dropdownMenuRef),
  );

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsEntered(true);
    }, 10);

    return () => {
      setIsEntered(false);
    };
  }, []);

  return (
    <div
      ref={dropdownMenuRef}
      className={isEntered ? 'entered' : ''}
      css={[
        styles.menu,
        styles.right,
        additionalStyles && additionalStyles,
        isOpen && styles.isOpen(isInPortal),
      ]}
    >
      {children}
    </div>
  );
};
