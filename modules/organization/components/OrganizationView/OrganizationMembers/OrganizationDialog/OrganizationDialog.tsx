import { useGetOrganizationMembers } from '@modules/organization/hooks/useGetMembers';
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

  const { setPageIndex } = useGetOrganizationMembers();

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
      headline: 'Remove Member',
      subheadline: `You are removing ${email} from ${selectedOrganization?.name}.`,
    },
    [Action.revoke]: {
      headline: 'Cancel Invitation',
      subheadline: `You are canceling an invitation to ${selectedOrganization?.name} for ${email}.`,
    },
  };

  return (
    <Modal portalId="modal-root" isOpen={true} handleClose={onHide}>
      <h2 css={[typo.medium, spacing.bottom.medium]}>
        {messages[activeAction].headline}
      </h2>
      <div css={spacing.bottom.medium}>
        <p>{messages[activeAction].subheadline}</p>
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
}
