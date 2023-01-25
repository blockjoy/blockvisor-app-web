import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { isStatusResponse } from '../utils/typeGuards';

type RemoveMemberInput = {
  user_id: string;
  org_id: string;
};

const removeMemberFromOrganization = async (
  user_id: string,
  org_id: string,
) => {
  const response = await apiClient.removeOrganizationMember(user_id, org_id);

  if (!isStatusResponse(response)) {
    return;
  } else {
    throw new ApplicationError('RemoveMemeberFromOrg', 'Remove failed');
  }
};

export function useRemoveMember() {
  const [organizationMembers, setOrganizationMembers] = useRecoilState(
    organizationAtoms.organizationMembers,
  );

  const removeMemberFromList = (user_id: string) => {
    const newOrganizationMembers = organizationMembers.filter(
      (member) => member.id !== user_id,
    );
    setOrganizationMembers(newOrganizationMembers);
  };

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: ({ user_id, org_id }: RemoveMemberInput) =>
      removeMemberFromOrganization(user_id, org_id),
    onSuccess(_, variables) {
      const { user_id } = variables;
      removeMemberFromList(user_id);
      toast.success('Removed successfully');
    },
    onError() {
      toast.error('Error while removing');
    },
  });

  return {
    isLoading,
    removeMemberFromOrganization: mutateAsync,
  };
}
