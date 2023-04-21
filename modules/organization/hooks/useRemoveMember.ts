import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/organization';
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
      (member) => member?.userId !== user_id,
    );

    setOrganization({
      ...organization!,
      members: newOrganizationMembers,
    });
  };

  const removeMemberFromOrganization = async (
    user_id: string,
    org_id: string,
  ) => {
    setIsLoading('loading');

    const response = await organizationClient.removeOrganizationMember(
      user_id,
      org_id,
    );

    if (response) {
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
