import { styles } from './Modal.styles';
import { ReactNode, useEffect, useRef } from 'react';
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
    if (ref.current) {
      ref.current.focus();

      window.addEventListener('keydown', handleEsc, false);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc, false);
    };
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
