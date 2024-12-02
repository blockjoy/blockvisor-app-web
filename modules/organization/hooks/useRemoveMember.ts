import { organizationClient } from '@modules/grpc';
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

  const removeMemberFromList = (userId: string) => {
    if (organization) {
      const organizationCopy = { ...organization };

      const members = organizationCopy.members!.filter(
        (member: any) => member?.userId !== userId,
      );

      organizationCopy.members = members;
      organizationCopy.memberCount = organizationCopy.memberCount - 1;

      // update all organizations list
      const organizationsCopy = [...organizations];
      const index = organizations.findIndex(
        (org) => org.orgId === organizationCopy.orgId,
      );
      organizationsCopy[index] = organizationCopy;

      setOrganization(organizationCopy);
      setOrganizations(organizationsCopy);
    }
  };

  const removeMemberFromOrganization = async (
    userId: string,
    orgId: string,
  ) => {
    setIsLoading('loading');
    try {
      await organizationClient.removeMember(userId, orgId);
      removeMemberFromList(userId);
      toast.success('Member Removed');
    } catch (err) {
      toast.error('Error while removing');
    } finally {
      setIsLoading('finished');
    }
  };

  return {
    isLoading,
    removeMemberFromOrganization,
  };
}
