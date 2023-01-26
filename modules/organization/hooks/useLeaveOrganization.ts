import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { isStatusResponse } from '../utils/typeGuards';
import { useGetOrganizations } from './useGetOrganizations';

export function useLeaveOrganization() {
  const { updateOrganizations } = useGetOrganizations();

  const leaveOrganization = async (org_id: string) => {
    const response = await apiClient.leaveOrganization(org_id);

    if (response && isStatusResponse(response)) {
      throw new ApplicationError('LeaveOrganization', response.message);
    }
    return;
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ orgId }: { orgId: string }) => leaveOrganization(orgId),
    onSuccess(_, variables) {
      const { orgId } = variables;
      updateOrganizations(orgId);
      toast.success('Successfully left the organization');
    },
    onError() {
      toast.error('Error while leaving the organization');
    },
  });

  return {
    loading: isLoading,
    leaveOrganization: mutateAsync,
  };
}
