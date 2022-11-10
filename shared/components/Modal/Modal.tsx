import { styles } from './Modal.styles';
import { ReactNode, useRef } from 'react';
import { useModal } from '@shared/hooks/useModal';
import { useClickOutside } from '@shared/hooks/useClickOutside';

type Props = {
  isOpen?: boolean;
  children?: ReactNode;
};
export const Modal = ({ isOpen, children }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { closeModal } = useModal();
  useClickOutside(ref, () => {
    closeModal();
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div css={[isOpen && styles.modal]} id="js-auth-layout">
      <div ref={ref} css={[isOpen && styles.base]}>
        {children}
      </div>
    </div>
  );
};
