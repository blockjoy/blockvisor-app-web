import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { rgba } from 'polished';
import { FC } from 'react';
import { Button } from '@shared/components';

type Props = {
  isVisible: boolean;
  onYesClicked: VoidFunction;
  onNoClicked: VoidFunction;
};

const styles = {
  overlay: (theme: ITheme) => css`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    background: ${rgba(theme.colorBackground || '#000', 0.7)};
    backdrop-filter: blur(10px);
    visibility: hidden;
    opacity: 0;
    transition-property: visibility, opacity;
    transition-duration: 0.5s;
  `,
  overlayVisible: css`
    visibility: visible;
    opacity: 1;
  `,
  dialog: (theme: ITheme) => css`
    background: #131414;
    border: 1px solid ${theme.colorBorder};
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    font-size: 14px;
    color: ${theme.colorDefault};
  `,
  dialogButtons: css`
    display: grid;
    gap: 6px;
    grid-template-columns: repeat(2, 1fr);
    padding: 20px 0 0;
  `,
};

export const HostAddConfirm: FC<Props> = ({
  isVisible,
  onYesClicked,
  onNoClicked,
}) => (
  <div css={[styles.overlay, isVisible && styles.overlayVisible]}>
    <div css={styles.dialog}>
      <div>Done with your key?</div>
      <div css={styles.dialogButtons}>
        <Button onClick={onYesClicked} style="primary" size="small">
          Yes
        </Button>
        <Button onClick={onNoClicked} style="outline" size="small">
          No
        </Button>
      </div>
    </div>
  </div>
);
