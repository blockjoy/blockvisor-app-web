import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { isStatusResponse } from '../utils/typeGuards';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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
  const client = useQueryClient();
  const [organization, setOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );

  const { isLoading } = useQuery({
    queryKey: ['organization', id],
    queryFn: () => fetchOrganizationById(id),
    onSuccess(data) {
      client.invalidateQueries({ queryKey: ['organizationMembers'] });
      setOrganization(data);
    },
  });

  return {
    organization,
    isLoading,
  };
}
