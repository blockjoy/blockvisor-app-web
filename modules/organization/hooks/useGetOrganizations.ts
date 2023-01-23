import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { isStatusResponse } from '../utils/typeGuards';

const fetchOrganizations = async () => {
  const response = await apiClient.getOrganizations();
  if (response && isStatusResponse(response)) {
    throw new ApplicationError('GetOrganizations', response.message);
  } else {
    return response ?? [];
  }
};

export function useGetOrganizations() {
  const [organizations, setOrganizations] = useRecoilState(
    organizationAtoms.allOrganizations,
  );

  const [pageIndex, setPageIndex] = useRecoilState(
    organizationAtoms.organizationsPageIndex,
  );

  const { isError, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: fetchOrganizations,
    onSuccess(data) {
      setOrganizations(data);
    },
  });

  const updateOrganizations = (org_id: string) => {
    const newOrganizations = organizations.filter(
      (organization) => organization.id !== org_id,
    );
    setOrganizations(newOrganizations);
  };

  const addToOrganizations = (org: any) => {
    const organizationsCopy = [...organizations];
    organizationsCopy.push(org);
    setOrganizations(organizationsCopy);
  };

  return {
    organizations,
    updateOrganizations,
    addToOrganizations,
    isError,
    isLoading,
    pageIndex,
    setPageIndex,
  };
}
