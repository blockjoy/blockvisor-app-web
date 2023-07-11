import { Contact } from 'chargebee-typescript/lib/resources';
import { Button, Modal } from '@shared/components';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './BillingContactDialog.styles';

export type DialogProps = {
  activeContact: Contact;
  onConfirm: (contact: Contact) => void;
  onHide: VoidFunction;
};

export const BillingContactDialog = ({
  activeContact,
  onConfirm,
  onHide,
}: DialogProps) => {
  const handleRemoveContact = async () => {
    await onConfirm(activeContact!);
  };

  const handleSubmit = () => {
    handleRemoveContact();
    onHide();
  };

  return (
    <Modal portalId="modal-root" isOpen={true} handleClose={onHide}>
      <h2 css={[typo.medium, spacing.bottom.medium]}>Remove Billing Contact</h2>
      <div css={spacing.bottom.medium}>
        <p>{`You are removing ${escapeHtml(
          activeContact?.email,
        )} from Billing Contacts list.`}</p>
      </div>
      <div css={[styles.actions]}>
        <Button style="warning" onClick={handleSubmit}>
          Confirm
        </Button>
        <Button style="outline" onClick={onHide}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
