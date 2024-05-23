import { useEffect, useRef } from 'react';
import { SerializedStyles } from '@emotion/react';
import { styles } from './Modal.styles';
import { Portal, SvgIcon } from '@shared/components';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import IconClose from '@public/assets/icons/common/Close.svg';

type Props = {
  isOpen?: boolean;
  portalId: string;
  handleClose?: any;
  additionalStyles?: SerializedStyles[];
  isActive?: boolean;
} & React.PropsWithChildren;

export function Modal({
  isOpen,
  children,
  portalId,
  handleClose,
  additionalStyles,
  isActive,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, handleClose, isActive);

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
        <div
          ref={ref}
          css={[isOpen && styles.base, additionalStyles && additionalStyles]}
        >
          {children}
          <button type="button" onClick={handleClose} css={styles.closeButton}>
            <SvgIcon size="24px">
              <IconClose />
            </SvgIcon>
          </button>
        </div>
      </div>
    </Portal>
  );
}
