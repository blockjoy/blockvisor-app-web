import { authAtoms } from '@modules/auth';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useGetOrganizations } from './useGetOrganizations';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';
import { Org, OrgUser } from '@modules/grpc/library/blockjoy/v1/org';
import { invitationAtoms } from '../store/invitationAtoms';

export function useUpdateMembers(): IUpdateMembersHook {
  const router = useRouter();

  const [sentInvitations, setSentInvitations] = useRecoilState(
    invitationAtoms.sentInvitations,
  );
  const user = useRecoilValue(authAtoms.user);
  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );

  const organizationMembers = selectedOrganization?.members;

  const { removeFromOrganizations } = useGetOrganizations();

  const updateMembersList = async (organization: Org) => {
    const { members, ...org }: Org = organization;

    const isUpdated: boolean = organizationMembers?.length !== members?.length;

    if (!isUpdated) return;

    const isAdded = members!.length > organizationMembers?.length!;

    if (!isAdded) {
      const isRemovedCurrentUser: boolean = !members?.some(
        (member: OrgUser) => member.userId === user?.userId,
      );

      if (isRemovedCurrentUser) {
        removeFromOrganizations(org?.orgId!);
      }
    }

    const newMembers = [...members!];

    const newInvitations: Invitation[] = sentInvitations.filter(
      (sentInvitation: Invitation) => {
        return !newMembers?.some(
          (member: OrgUser) => member.email === sentInvitation.inviteeEmail,
        );
      },
    );

    const selectedOrganizationCopy = { ...selectedOrganization! };
    selectedOrganizationCopy.members = newMembers;

    setSelectedOrganization(selectedOrganizationCopy);
    setSentInvitations(newInvitations);
  };

  return {
    updateMembersList,
  };
}
