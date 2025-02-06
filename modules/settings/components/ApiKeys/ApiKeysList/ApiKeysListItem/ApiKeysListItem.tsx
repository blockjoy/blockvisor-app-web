import React, { useState } from 'react';
import { ApiKey } from '@modules/grpc/library/blockjoy/v1/api_key';
import { Button, SvgIcon } from '@shared/components';
import { styles } from './ApiKeysListItem.styles';
import { getPermissionsGrouped, formatters } from '@shared/index';
import { API_KEYS_LIST_GROUPS_PER_VIEW } from '@modules/settings';
import IconKey from '@public/assets/icons/common/Key.svg';
import IconDelete from '@public/assets/icons/common/Trash.svg';

type Props = {
  apiKey: ApiKey;
  handleAction?: (view: ApiKeysView, apiKey: ApiKey) => void;
};

export const ApiKeysListItem = ({ apiKey, handleAction }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    apiKey: ApiKey,
  ) => {
    e.stopPropagation();
    handleAction?.({ modal: 'delete' }, apiKey);
  };

  const permissionsGrouped = getPermissionsGrouped(apiKey.permissions);

  const groupKeys = Object.keys(permissionsGrouped);

  const visibleGroupKeys = showAll
    ? groupKeys
    : groupKeys.slice(0, API_KEYS_LIST_GROUPS_PER_VIEW);

  return (
    <div css={styles.wrapper}>
      <div css={styles.header}>
        <SvgIcon size="26px">
          <IconKey />
        </SvgIcon>
        <div>
          <h4 css={styles.headline}>{apiKey.label}</h4>

          <span css={styles.date}>
            Added on {formatters.formatDate(apiKey.createdAt!)}
          </span>
        </div>

        <Button
          style="icon"
          size="small"
          onClick={(e) => handleDelete(e, apiKey)}
          customCss={[styles.button]}
        >
          <SvgIcon size="14px">
            <IconDelete />
          </SvgIcon>
        </Button>
      </div>
      <div css={styles.content}>
        {visibleGroupKeys.map((groupKey) => (
          <div key={groupKey} css={styles.permissionGroup}>
            <h3 css={styles.permissionGroupTitle}>
              {groupKey.replace('-', ' ')}
            </h3>
            <div css={styles.permissions}>
              {permissionsGrouped[groupKey].map((permission) => (
                <span key={permission} css={styles.permission}>
                  {permission}
                </span>
              ))}
            </div>
          </div>
        ))}

        {groupKeys.length > API_KEYS_LIST_GROUPS_PER_VIEW && (
          <Button
            size="small"
            style="basic"
            onClick={() => setShowAll((prev) => !prev)}
            customCss={[styles.button]}
          >
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
        )}
      </div>
    </div>
  );
};
