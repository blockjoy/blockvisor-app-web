import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useRemoveMember() {
  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationMemberLoadingState,
  );

  const [organization, setOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );

  const [organizations, setOrganizations] = useRecoilState(
    organizationAtoms.allOrganizations,
  );

  const organizationMembers = organization?.members;

  const decrementMemberCount = () => {
    const newOrg: Org = {
      ...organization!,
      memberCount: organization?.memberCount! - 1,
    };

    const organizationsCopy = [...organizations];

    const index = organizations.findIndex((org) => org.id === newOrg.id);

    organizationsCopy[index] = newOrg;

    setOrganizations(organizationsCopy);
    setOrganization(newOrg);
  };

  const removeMemberFromList = (user_id: string) => {
    const newOrganizationMembers = organizationMembers!.filter(
      (member: any) => member?.userId !== user_id,
    );

    setOrganization({
      ...organization!,
      members: newOrganizationMembers,
    });
  };

  const removeMemberFromOrganization = async (
    userId: string,
    orgId: string,
  ) => {
    setIsLoading('loading');
    const response = await organizationClient.removeMember(userId, orgId);

    if (response) {
      removeMemberFromList(userId);
      decrementMemberCount();
      toast.success('Member Removed');
    } else {
      toast.error('Error while removing');
    }

    setIsLoading('finished');
  };

  return {
    isLoading,
    removeMemberFromOrganization,
  };
}
