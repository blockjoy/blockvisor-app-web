import { authAtoms } from '@modules/auth';
import { ROUTES } from '@shared/index';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useDeleteOrganization } from './useDeleteOrganization';
import {
  Invitation,
  OrgUser,
} from '@blockjoy/blockjoy-grpc/dist/out/common_pb';

export function useUpdateMembers(): IUpdateMembersHook {
  const router = useRouter();

  const [organizationMembers, setOrganizationMembers] = useRecoilState(
    organizationAtoms.organizationMembers,
  );
  const [sentInvitations, setSentInvitations] = useRecoilState(
    organizationAtoms.organizationSentInvitations,
  );
  const user = useRecoilValue(authAtoms.user);
  const selectedOrganization = useRecoilValue(
    organizationAtoms.selectedOrganization,
  );

  const { removeOrganization } = useDeleteOrganization();

  const updateMembersList = async (organization: ClientOrganization) => {
    const { membersList, ...org }: ClientOrganization = organization;

    // TODO: add deep checks
    const isUpdated: boolean =
      organizationMembers.length !== membersList?.length;

    if (!isUpdated) return;

    const isAdded: boolean = membersList?.length! > organizationMembers.length;

    if (!isAdded) {
      const isRemovedCurrentUser: boolean = !membersList?.some(
        (member: OrgUser.AsObject) => member.userId === user?.id,
      );

      if (isRemovedCurrentUser) {
        removeOrganization(org?.id!);

        if (selectedOrganization && selectedOrganization.id === org?.id)
          router.push(ROUTES.ORGANIZATIONS);
      }
    }

    // TODO: check if it needs to be modified
    const newMembers = [...membersList!];

    const newInvitations: Invitation.AsObject[] = sentInvitations.filter(
      (sentInvitation: Invitation.AsObject) => {
        return !newMembers?.some(
          (member: OrgUser.AsObject) =>
            member.email === sentInvitation.inviteeEmail,
        );
      },
    );

    setOrganizationMembers(newMembers!);
    setSentInvitations(newInvitations);
  };

  return {
    updateMembersList,
  };
}
