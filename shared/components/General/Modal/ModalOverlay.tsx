import { styles } from './ModalOverlay.styles';

type Props = { isActive?: boolean } & React.PropsWithChildren;

export function ModalOverlay({ isActive, children }: Props) {
  if (!isActive) {
    return null;
  }
  return (
    <div css={[styles.overlay, isActive && styles.visible]}>{children}</div>
  );
}
