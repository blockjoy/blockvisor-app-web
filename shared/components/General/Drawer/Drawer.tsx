import { PropsWithChildren, useEffect, useRef } from 'react';
import { SerializedStylesAll } from 'types/theme';
import { useEsc } from '@shared/index';
import { SvgIcon } from '@shared/components';
import { styles } from './Drawer.styles';
import IconClose from '@public/assets/icons/common/Close.svg';

type Props = {
  title?: string;
  header?: React.ReactNode;
  isOpen: boolean;
  asideStyles?: SerializedStylesAll;
  onClose: VoidFunction;
} & PropsWithChildren;

export const Drawer = ({
  children,
  title,
  header,
  isOpen,
  asideStyles,
  onClose,
}: Props) => {
  const asideRef = useRef<HTMLDivElement>(null);

  useEsc(() => {
    if (isOpen) onClose();
  });

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        asideRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      }, 300);
    }
  }, [isOpen]);

  return (
    <>
      <div
        css={[styles.overlay, isOpen ? styles.overlayVisible : '']}
        onClick={onClose}
      />

      <aside
        css={[
          styles.drawer,
          isOpen ? styles.open : '',
          asideStyles && asideStyles,
        ]}
        ref={asideRef}
      >
        <div css={styles.header}>{header ?? <h4>{title}</h4>}</div>

        <div css={styles.content}>{children}</div>
        <button type="button" onClick={onClose} css={styles.closeButton}>
          <SvgIcon size="16px">
            <IconClose />
          </SvgIcon>
        </button>
      </aside>
    </>
  );
};
