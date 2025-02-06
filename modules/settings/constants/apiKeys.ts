import { ResourceType } from '@modules/grpc/library/blockjoy/common/v1/resource';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { ApiKey } from '@modules/grpc/library/blockjoy/v1/api_key';
import { BaseQueryParams, Sort } from '@shared/common/common';
import { ApiKeyForm } from '../components/ApiKeys/ApiKeyForm/ApiKeyForm';

export const API_KEYS_LIST_GROUPS_PER_VIEW = 5;

export const API_KEYS_DEFAULT_SORT: Sort<keyof ApiKey> = {
  field: 'createdAt',
  order: SortOrder.SORT_ORDER_DESCENDING,
};

export const API_KEYS_QUERY_PARAMS: BaseQueryParams = {
  sort: [API_KEYS_DEFAULT_SORT],
  pagination: {
    currentPage: 0,
    itemsPerPage: 1000,
  },
};

export const DEFAULT_API_KEYS_VIEW: ApiKeysView = {
  drawer: null,
  modal: null,
};

export const API_KEY_FORM_DEFAULT_VALUES: ApiKeyForm = {
  label: '',
  resourceId: '',
  resourceType: ResourceType.RESOURCE_TYPE_USER,
  permissions: [],
};
