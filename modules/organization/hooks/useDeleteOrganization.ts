import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteOrganization = async (id: string) => {
  const response = await apiClient.deleteOrganization(id);

  /* TODO: temporary fix - API for node deletion doesn't return success response, but instead code 25 (Record not found) */
  if (isResponeMetaObject(response) || response?.code === 25) {
    return;
  } else {
    throw new ApplicationError('DeleteOrganization', 'Delete Failed');
  }
};

export function useDeleteOrganization() {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (id: string) => deleteOrganization(id),
    onSuccess() {
      client.invalidateQueries({ queryKey: ['organizations'] });
    },
  });

  return {
    loading: isLoading,
    deleteOrganization: mutateAsync,
  };
}
