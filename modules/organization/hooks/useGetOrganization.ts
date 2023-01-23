import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { isStatusResponse } from '../utils/typeGuards';
import { useQuery } from '@tanstack/react-query';

const fetchOrganizationById = async (id: string) => {
  const response = await apiClient.getOrganizations(id);

  if (response && isStatusResponse(response)) {
    throw new ApplicationError('GetOrganizations', response.message);
  }

  if (response?.length) {
    const [first] = response;
    return first;
  }

  return null;
};

export function useGetOrganization(id: string) {
  const [organization, setOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );

  const { isLoading } = useQuery({
    queryKey: ['organization', id],
    queryFn: async () => fetchOrganizationById(id),
    onSuccess(data) {
      setOrganization(data);
    },
  });

  return {
    organization,
    isLoading,
  };
}
