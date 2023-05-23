import { authAtoms } from '@modules/auth';
import { ROUTES } from '@shared/index';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useDeleteOrganization } from './useDeleteOrganization';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';
import { Org, OrgUser } from '@modules/grpc/library/blockjoy/v1/org';

export function useUpdateMembers(): IUpdateMembersHook {
  const router = useRouter();

  const [sentInvitations, setSentInvitations] = useRecoilState(
    organizationAtoms.organizationSentInvitations,
  );
  const user = useRecoilValue(authAtoms.user);
  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );

  const organizationMembers = selectedOrganization?.members;

  const { removeOrganization } = useDeleteOrganization();

  const updateMembersList = async (organization: Org) => {
    const { members, ...org }: Org = organization;

    // TODO: add deep checks
    const isUpdated: boolean = organizationMembers?.length !== members?.length;

    if (!isUpdated) return;

    const isAdded = members!.length > organizationMembers?.length!;

    if (!isAdded) {
      const isRemovedCurrentUser: boolean = !members?.some(
        (member: OrgUser) => member.userId === user?.id,
      );

      if (isRemovedCurrentUser) {
        removeOrganization(org?.id!);

        if (selectedOrganization && selectedOrganization.id === org?.id)
          router.push(ROUTES.ORGANIZATIONS);
      }
    }

    // TODO: check if it needs to be modified
    const newMembers = [...members!];

    const newInvitations: Invitation[] = sentInvitations.filter(
      (sentInvitation: Invitation) => {
        return !newMembers?.some(
          (member: OrgUser) => member.email === sentInvitation.inviteeEmail,
        );
      },
    );

    const selectedOrganizationCopy = { ...selectedOrganization };

    selectedOrganizationCopy.members = newMembers;

    // setSelectedOrganization(selectedOrganizationCopy);
    setSentInvitations(newInvitations);
  };

  return {
    updateMembersList,
  };
}
