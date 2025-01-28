import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { ApiKey } from '@modules/grpc/library/blockjoy/v1/api_key';
import { ITheme } from 'types/theme';
import { getResourceName, RESOURCE_TYPE_ITEMS } from '@shared/index';
import { Button, DateTime, SvgIcon } from '@shared/components';
import { organizationAtoms } from '@modules/organization';
import { nodeAtoms } from '@modules/node';
import { hostAtoms } from '@modules/host';
import { authAtoms } from '@modules/auth';
import IconDelete from '@public/assets/icons/common/Trash.svg';

export const mapApiKeysToRows = (
  apiKeys?: ApiKey[],
  handleAction?: (view: ApiKeysView, apiKey: ApiKey) => void,
) => {
  const user = useRecoilValue(authAtoms.user);
  const allOrganizations = useRecoilValue(organizationAtoms.allOrganizations);
  const allNodes = useRecoilValue(nodeAtoms.nodeList);
  const allHosts = useRecoilValue(hostAtoms.allHosts);

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    apiKey: ApiKey,
  ) => {
    e.stopPropagation();

    handleAction?.(
      {
        modal: 'delete',
      },
      apiKey,
    );
  };

  const headers: TableHeader[] = [
    {
      key: 'label',
      name: 'Label',
      width: '320px',
      dataField: 'label',
    },
    {
      key: 'createdAt',
      name: 'Created At',
      width: '280px',
      dataField: 'createdAt',
    },
    {
      key: 'customResourceType',
      name: 'Resource Type',
      width: '200px',
    },
    {
      key: 'customResourceName',
      name: 'Resource',
      width: '300px',
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
    | keyof ApiKey
    | 'actions'
    | 'customOrganization'
    | 'customResourceType'
    | 'customResourceName'
  >[] =
    apiKeys?.map((apiKey: ApiKey) => {
      const resource = RESOURCE_TYPE_ITEMS.find(
        (res) => res.value === apiKey.resource?.resourceType,
      );

      const resourceName = getResourceName({
        resource: apiKey.resource,
        user,
        allOrganizations,
        allHosts,
        allNodes,
      });

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
            key: 'customResourceType',
            component: <span>{resource?.name}</span>,
          },
          {
            key: 'customResourceName',
            component: <span>{resourceName ?? '-'}</span>,
          },
          {
            key: 'actions',
            component: (
              <Button
                style="icon"
                onClick={(e) => handleDelete(e, apiKey)}
                tooltip="Delete"
                customCss={[styles.button, styles.buttonDelete]}
              >
                <SvgIcon size="20px">
                  <IconDelete />
                </SvgIcon>
              </Button>
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

const styles = {
  button: css`
    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,

  buttonDelete: (theme: ITheme) => css`
    :hover svg path {
      fill: ${theme.colorDanger};
    }
  `,
};
