import { css } from '@emotion/react';
import { ApiKey } from '@modules/grpc/library/blockjoy/v1/api_key';
import { ITheme } from 'types/theme';
import { RESOURCE_TYPE_ITEMS } from '@shared/index';
import { Button, DateTime, SvgIcon } from '@shared/components';
import IconDelete from '@public/assets/icons/common/Trash.svg';

export const mapApiKeysToRows = (
  apiKeys?: ApiKey[],
  handleAction?: (view: ApiKeysView, apiKey: ApiKey) => void,
) => {
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
    keyof ApiKey | 'actions' | 'customOrganization'
  >[] =
    apiKeys?.map((apiKey: ApiKey) => {
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
