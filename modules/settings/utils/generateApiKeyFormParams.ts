import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';
import { ApiKeyServiceCreateRequest } from '@modules/grpc/library/blockjoy/v1/api_key';
import { ApiKeyForm } from '@modules/settings';

export const generateApiKeyFormParams = (
  formParams: ApiKeyForm,
  defaultOrganizationId?: string,
  personalOrganizationId?: string,
) => {
  let resourceId = formParams.resourceId ?? '';
  let resourceType =
    formParams.resourceType ?? ResourceType.RESOURCE_TYPE_UNSPECIFIED;

  switch (formParams.resourceType) {
    case ResourceType.RESOURCE_TYPE_USER: {
      if (personalOrganizationId) resourceId = personalOrganizationId;
      break;
    }
    case ResourceType.RESOURCE_TYPE_ORG: {
      if (defaultOrganizationId) resourceId = defaultOrganizationId;
      break;
    }
    case ResourceType.RESOURCE_TYPE_NODE:
    case ResourceType.RESOURCE_TYPE_HOST:
      break;
    default:
      break;
  }

  const params: ApiKeyServiceCreateRequest & { permissions: string[] } = {
    label: formParams.label,
    resource: {
      resourceId,
      resourceType,
    },
    permissions: formParams.permissions,
  };

  return params;
};
