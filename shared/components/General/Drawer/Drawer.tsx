import { PropsWithChildren } from 'react';
import { SerializedStyles } from '@emotion/react';
import { useEsc } from '@shared/index';
import { SvgIcon } from '@shared/components';
import { styles } from './Drawer.styles';
import IconClose from '@public/assets/icons/common/Close.svg';

type Props = {
  title?: string;
  isOpen: boolean;
  asideStyles?: SerializedStyles[];
  onClose: VoidFunction;
} & PropsWithChildren;

export const Drawer = ({
  children,
  title,
  isOpen,
  asideStyles,
  onClose,
}: Props) => {
  useEsc(() => {
    if (isOpen) onClose();
  });

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
      >
        <h4 css={styles.heading}>
          <span>{title}</span>
        </h4>
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
