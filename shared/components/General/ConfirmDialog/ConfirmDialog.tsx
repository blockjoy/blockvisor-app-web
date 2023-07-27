import { Button, ButtonGroup, Modal } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';

export type ConfirmDialogProps = {
  title: string;
  message: string;
  handleConfirm: VoidFunction;
  onHide: VoidFunction;
};

export const ConfirmDialog = ({
  title,
  message,
  handleConfirm,
  onHide,
}: ConfirmDialogProps) => {
  const handleSubmit = async () => {
    handleConfirm();
    onHide();
  };

  return (
    <Modal portalId="modal-root" isOpen={true} handleClose={onHide}>
      <h2 css={[typo.medium, spacing.bottom.medium]}>{title}</h2>
      <div css={spacing.bottom.medium}>
        <p>{message}</p>
      </div>
      <ButtonGroup type="extended">
        <Button style="warning" onClick={handleSubmit}>
          Confirm
        </Button>
        <Button style="outline" onClick={onHide}>
          Cancel
        </Button>
      </ButtonGroup>
    </Modal>
  );
};
