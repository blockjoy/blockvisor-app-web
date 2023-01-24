import { Organization } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useSetDefaultOrganization } from './useSetDefaultOrganization';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDefaultOrganization } from './useDefaultOrganization';

const updateOrg = async (id: string, name: string) => {
  const organization = new Organization();
  organization.setName(name);
  organization.setId(id);
  const response = await apiClient.updateOrganization(organization);

  if (isResponeMetaObject(response)) {
    return;
  } else {
    throw new ApplicationError('UpdateOrganization', 'Update failed');
  }
};

export function useUpdateOrganization() {
  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );
  const { defaultOrganization } = useDefaultOrganization();
  const { setDefaultOrganization } = useSetDefaultOrganization();
  const client = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateOrg(id, name),
    onSuccess(_, variables) {
      const { id, name } = variables;
      client.invalidateQueries({ queryKey: ['organization', id] });
      client.invalidateQueries({ queryKey: ['organizations'] });
      setSelectedOrganization({ id, name });

      if (defaultOrganization?.id === selectedOrganization?.id) {
        setDefaultOrganization(selectedOrganization?.id ?? '', name);
      }
    },
  });

  return {
    updateOrganization: mutateAsync,
    loading: isLoading,
  };
}
