import { SerializedStyles } from '@emotion/react';
import { styles } from './DropdownMenu.styles';

type Props = {
  isOpen?: boolean;
  additionalStyles?: SerializedStyles[] | SerializedStyles;
} & React.PropsWithChildren;

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
