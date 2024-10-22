import { css, Global } from '@emotion/react';
import { createPortal } from 'react-dom';
import { styles } from './NodeViewEditPanel.styles';

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export const NodeViewEditPanel = ({ isOpen, onClose }: Props) => {
  return (
    <>
      {isOpen && (
        <Global
          styles={css`
            body {
              overflow: hidden;
              padding-right: 8px;
            }
          `}
        />
      )}
      {createPortal(
        <>
          <div
            onClick={onClose}
            css={[styles.overlay, isOpen && styles.overlayVisible]}
          ></div>
          <aside css={[styles.editPanel, isOpen && styles.editPanelVisible]}>
            Edit Panel
          </aside>
        </>,
        document.body,
      )}
    </>
  );
};
