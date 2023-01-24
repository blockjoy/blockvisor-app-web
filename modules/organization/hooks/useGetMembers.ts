import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { isStatusResponse } from '../utils/typeGuards';

const fetchOrganizationMembers = async (id: string) => {
  const response = await apiClient.getOrganizationMembers(id);

  if (response && isStatusResponse(response)) {
    throw new ApplicationError('GetOrganizationMembers', response.message);
  } else {
    return response ?? [];
  }
};

export function useGetOrganizationMembers(id: string) {
  const [organizationMembers, setOrganizationMembers] = useRecoilState(
    organizationAtoms.organizationMembers,
  );

  const [pageIndex, setPageIndex] = useRecoilState(
    organizationAtoms.organizationMembersPageIndex,
  );

  const { isLoading } = useQuery({
    queryKey: ['organizationMembers', id],
    queryFn: () => fetchOrganizationMembers(id),
    onSuccess(data) {
      setOrganizationMembers(data);
    },
  });

  return {
    organizationMembers,
    isLoading,
    pageIndex,
    setPageIndex,
  };
}
