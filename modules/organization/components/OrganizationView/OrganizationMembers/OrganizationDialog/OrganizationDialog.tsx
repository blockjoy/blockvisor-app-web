import { useInvitations } from '@modules/organization/hooks/useInvitations';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import { Member } from '@modules/organization/utils/mapOrganizationMembersToRows';
import { Button, Modal } from '@shared/components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './OrganizationDialog.styles';

export type DialogProps = {
  activeMember: Member;
  onHide: VoidFunction;
};

export function OrganizationDialog({
  activeMember: { invitation_id, email },
  onHide,
}: DialogProps) {
  const [sentInvitations, setSentInvitations] = useRecoilState(
    organizationAtoms.organizationSentInvitations,
  );

  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const { revokeInvitation } = useInvitations();

  const handleRevokeInvitation = async () => {
    await revokeInvitation({ invitationId: invitation_id, email }, () =>
      updateInvitations(invitation_id!),
    );
    onHide();
  };

  const updateInvitations = (invitation_id: string) => {
    const newSentInvitations = sentInvitations.filter(
      (invitation) => invitation.id !== invitation_id,
    );
    setSentInvitations(newSentInvitations);
  };

  return (
    <Modal portalId="modal-root" isOpen={true} handleClose={onHide}>
      <h2 css={[typo.medium, spacing.bottom.medium]}>
        Remove 1 member from {selectedOrganization?.name}
      </h2>
      <div css={spacing.bottom.medium}>
        <p css={spacing.bottom.micro}>The following members will be removed:</p>
        <small>{email}</small>
      </div>
      <div css={[styles.actions, spacing.top.medium]}>
        <Button onClick={() => handleRevokeInvitation()} style="warning">
          Confirm
        </Button>
        <Button style="outline" onClick={onHide}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
