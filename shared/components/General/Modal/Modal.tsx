import { styles } from './Modal.styles';
import { ReactNode, useEffect, useRef } from 'react';
import { Portal, SvgIcon } from '@shared/components';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import IconClose from '@public/assets/icons/common/Close.svg';

type Props = {
  isOpen?: boolean;
  children?: ReactNode;
  portalId: string;
  handleClose?: any;
};

export function Modal({ isOpen, children, portalId, handleClose }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => {
    handleClose();
  });

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
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
          <button type="button" onClick={handleClose} css={styles.closeButton}>
            <span css={styles.iconWrapper}>
              <SvgIcon size="26px">
                <IconClose />
              </SvgIcon>
            </span>
          </button>
        </div>
      </div>
    </Portal>
  );
}
