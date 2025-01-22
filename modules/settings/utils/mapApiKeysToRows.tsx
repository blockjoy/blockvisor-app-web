import { ListApiKey } from '@modules/grpc/library/blockjoy/v1/api_key';
import { RESOURCE_TYPE_ITEMS } from '@shared/index';
import { DateTime } from '@shared/components';
import { ApiKeyActions } from '@modules/settings';

export const mapApiKeysToRows = (
  apiKeys?: ListApiKey[],
  handleView?: (view: ApiKeysView) => void,
) => {
  const headers: TableHeader[] = [
    {
      key: 'label',
      name: 'Label',
      width: '400px',
      dataField: 'label',
    },
    {
      key: 'createdAt',
      name: 'Created At',
      width: '300px',
      dataField: 'createdAt',
    },
    {
      key: 'resource',
      name: 'Resource',
      width: '220px',
    },
    {
      key: 'actions',
      name: '',
      width: '130px',
      minWidth: '130px',
      textAlign: 'right',
    },
  ];

  const rows: TableRow<
    string,
    keyof ListApiKey | 'actions' | 'customOrganization'
  >[] =
    apiKeys?.map((apiKey: ListApiKey) => {
      const resource = RESOURCE_TYPE_ITEMS.find(
        (res) => res.value === apiKey.resource?.resourceType,
      );

      return {
        key: apiKey.apiKeyId!,
        cells: [
          {
            key: 'label',
            component: <span>{apiKey.label}</span>,
          },
          {
            key: 'createdAt',
            component: <DateTime date={new Date(apiKey.createdAt!)} />,
          },
          {
            key: 'resource',
            component: <span>{resource?.name}</span>,
          },
          {
            key: 'actions',
            component: (
              <ApiKeyActions apiKey={apiKey} handleView={handleView} />
            ),
          },
        ],
      };
    }) ?? [];

  return {
    rows,
    headers,
  };
};
