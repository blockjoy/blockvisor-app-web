import { useInvitations } from '@modules/organization/hooks/useInvitations';
import { useRemoveMember } from '@modules/organization/hooks/useRemoveMember';
import { organizationAtoms } from '@modules/organization/store/organizationAtoms';
import {
  Action,
  Member,
} from '@modules/organization/utils/mapOrganizationMembersToRows';
import { escapeHtml } from '@shared/utils/escapeHtml';
import { Button, Modal } from '@shared/components';
import { useRecoilValue } from 'recoil';
import { spacing } from 'styles/utils.spacing.styles';
import { typo } from 'styles/utils.typography.styles';
import { styles } from './OrganizationDialog.styles';
import { useState } from 'react';
import { css } from '@emotion/react';

export type DialogProps = {
  activeMember: Member;
  activeAction: Action;
  onHide: VoidFunction;
};

export function OrganizationDialog({
  activeMember: { email, invitationId, userId, orgId },
  activeAction,
  onHide,
}: DialogProps) {
  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const [isLoading, setIsLoading] = useState(false);

  const { revokeInvitation } = useInvitations();
  const { removeMemberFromOrganization } = useRemoveMember();

  const handleRevokeInvitation = async () => {
    await revokeInvitation({ invitationId });
  };

  const handleRemoveMember = async () => {
    await removeMemberFromOrganization(userId!, orgId!);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    switch (activeAction) {
      case Action.remove:
        await handleRemoveMember();
        break;
      case Action.revoke:
        await handleRevokeInvitation();
        break;
      default:
        break;
    }

    onHide();
  };

  const messages = {
    [Action.remove]: {
      headline: 'Remove Member',
      subheadline: `You are removing ${escapeHtml(email!)} from ${escapeHtml(
        selectedOrganization?.name!,
      )}.`,
    },
    [Action.revoke]: {
      headline: 'Cancel Invitation',
      subheadline: `You are canceling an invitation to ${escapeHtml(
        selectedOrganization?.name!,
      )} for ${escapeHtml(email!)}.`,
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
        <Button
          customCss={[
            css`
              min-width: 125px;
            `,
          ]}
          loading={isLoading}
          style="warning"
          onClick={handleSubmit}
        >
          Confirm
        </Button>
        <Button
          customCss={[
            css`
              min-width: 125px;
            `,
          ]}
          style="outline"
          onClick={onHide}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
