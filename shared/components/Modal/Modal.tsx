import { styles } from './Modal.styles';
import { ReactNode, useEffect, useRef } from 'react';
import { useModal } from '@shared/hooks/useModal';
import { Portal } from '@shared/components';
import { useClickOutside } from '@shared/hooks/useClickOutside';

type Props = {
  isOpen?: boolean;
  children?: ReactNode;
  portalId: string;
};
export const Modal = ({ isOpen, children, portalId }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { closeModal } = useModal();
  useClickOutside(ref, () => {
    closeModal();
  });

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  useEffect(() => {
    if (ref.current && isOpen) {
      ref.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc, false);

    return () => {
      window.removeEventListener('keydown', handleEsc, false);
    };
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal wrapperId={portalId}>
      <div css={[isOpen && styles.modal]} id="js-auth-layout">
        <div ref={ref} css={[isOpen && styles.base]}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
