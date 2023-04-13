import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { isStatusResponse } from '../utils/typeGuards';

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

  const [organizationMembers, setOrganizationMembers] = useRecoilState(
    organizationAtoms.organizationMembers,
  );

  const decrementMemberCount = () => {
    const newOrg = {
      ...organization,
      memberCount: organization?.memberCount! - 1,
    };

    const organizationsCopy = [...organizations];

    const index = organizations.findIndex((org) => org.id === newOrg.id);

    organizationsCopy[index] = newOrg;

    setOrganizations(organizationsCopy);
    setOrganization(newOrg);
  };

  const removeMemberFromList = (user_id: string) => {
    const newOrganizationMembers = organizationMembers.filter(
      (member) => member.id !== user_id,
    );
    setOrganizationMembers(newOrganizationMembers);
  };

  const removeMemberFromOrganization = async (
    user_id: string,
    org_id: string,
  ) => {
    setIsLoading('loading');

    const response = await apiClient.removeOrganizationMember(user_id, org_id);

    if (!isStatusResponse(response)) {
      removeMemberFromList(user_id);
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
