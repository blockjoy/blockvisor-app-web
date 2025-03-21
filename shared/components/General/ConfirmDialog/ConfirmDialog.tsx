import { useState } from 'react';
import { Button, ButtonGroup, Modal } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';

export type ConfirmDialogProps = {
  title: string;
  message: string;
  handleConfirm: () => void | Promise<void>;
  onHide: VoidFunction;
  type?: ButtonStyle;
};

export const ConfirmDialog = ({
  title,
  message,
  handleConfirm,
  onHide,
  type = 'warning',
}: ConfirmDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    setIsLoading(true);

    await Promise.resolve(handleConfirm());

    setIsLoading(false);
    onHide();
  };

  return (
    <Modal portalId="modal-root" isOpen={true} handleClose={onHide}>
      <h2 css={[typo.medium, spacing.bottom.medium]}>{title}</h2>
      <div css={spacing.bottom.medium}>
        <p>{message}</p>
      </div>
      <ButtonGroup type="extended">
        <Button style={type} onClick={handleSubmit} loading={isLoading}>
          Confirm
        </Button>
        <Button style="outline" onClick={onHide}>
          Cancel
        </Button>
      </ButtonGroup>
    </Modal>
  );
};
