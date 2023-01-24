import {
  Organization,
  ResponseMeta,
} from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { apiClient } from '@modules/client';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function isSuccess(response: ResponseMeta.AsObject) {
  return response.status === ResponseMeta.Status.SUCCESS;
}

async function createOrganization({ name }: { name: string }) {
  const organization = new Organization();
  const uuid = Math.random().toString();
  organization.setId(uuid);
  organization.setName(name);

  const response = await apiClient.createOrganization(organization);

  if (
    isResponeMetaObject(response) &&
    isSuccess(response) &&
    response?.messagesList?.length
  ) {
    const orgId = response?.messagesList[0];
    const org = await apiClient.getOrganizations(orgId);

    if (org) {
      return org as Organization.AsObject[];
    }
  } else {
    throw new ApplicationError('CreateOrganization', 'Creation failed');
  }
}

export function useCreateOrganization() {
  const router = useRouter();
  const client = useQueryClient();

  const { mutateAsync, isSuccess, isLoading } = useMutation({
    mutationFn: createOrganization,
    onSuccess: async (data) => {
      toast.success('Organization created');
      if (data) {
        client.setQueryData<any[]>(['organizations'], (old) =>
          old ? [...old, ...data] : [...data],
        );
        router.push(`/organizations/${data[0].id}`);
      }
    },
  });

  return { createOrganization: mutateAsync, success: isSuccess, isLoading };
}
