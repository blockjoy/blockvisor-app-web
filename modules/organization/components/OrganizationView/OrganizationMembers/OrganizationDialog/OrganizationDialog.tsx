import { useInvitations } from '@modules/organization/hooks/useInvitations';
import { useRemoveMember } from '@modules/organization/hooks/useRemoveMember';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import {
  Action,
  Member,
} from '@modules/organization/utils/mapOrganizationMembersToRows';
import { Button, Modal } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './OrganizationDialog.styles';

export type DialogProps = {
  activeMember: Member;
  activeAction: Action;
  onHide: VoidFunction;
};

export function OrganizationDialog({
  activeMember: { email, invitation_id, user_id, org_id },
  activeAction,
  onHide,
}: DialogProps) {
  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const { revokeInvitation } = useInvitations();
  const { removeMemberFromOrganization } = useRemoveMember();

  const handleRevokeInvitation = async () => {
    await revokeInvitation({ invitationId: invitation_id, email });
  };

  const handleRemoveMember = async () => {
    await removeMemberFromOrganization(user_id!, org_id!);
  };

  const handleSubmit = () => {
    switch (activeAction) {
      case Action.remove:
        handleRemoveMember();
        break;
      case Action.revoke:
        handleRevokeInvitation();
        break;
      default:
        break;
    }

    onHide();
  };

  const messages = {
    [Action.remove]: {
      headline: `Remove 1 member from ${selectedOrganization?.name}`,
      subheadline: 'The following members will be removed:',
    },
    [Action.revoke]: {
      headline: `Canceling 1 invitation from ${selectedOrganization?.name}`,
      subheadline: 'The following invitations will be canceled:',
    },
  };

  return (
    <Modal portalId="modal-root" isOpen={true} handleClose={onHide}>
      <h2 css={[typo.medium, spacing.bottom.medium]}>
        {messages[activeAction].headline}
      </h2>
      <div css={spacing.bottom.medium}>
        <p css={spacing.bottom.micro}>{messages[activeAction].subheadline}</p>
        <small>{email}</small>
      </div>
      <div css={[styles.actions, spacing.top.medium]}>
        <Button style="warning" onClick={handleSubmit}>
          Confirm
        </Button>
        <Button style="outline" onClick={onHide}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
