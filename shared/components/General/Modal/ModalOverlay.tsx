import { ReactNode } from 'react';
import { styles } from './ModalOverlay.styles';

type Props = {
  isActive?: boolean;
  children?: ReactNode;
};

export function ModalOverlay({ isActive, children }: Props) {
  if (!isActive) {
    return null;
  }
  return (
    <div css={[styles.overlay, isActive && styles.visible]}>{children}</div>
  );
}
