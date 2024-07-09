import { capitalized } from '@modules/admin/utils/capitalized';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminDetailHeader } from './AdminDetailHeader/AdminDetailHeader';
import { AdminDetailTable } from './AdminDetailTable/AdminDetailTable';
import { copyToClipboard } from '@shared/utils/copyToClipboard';
import { nodeClient } from '@modules/grpc';
import { spacing } from 'styles/utils.spacing.styles';
import { DateTime } from '@shared/components';
import { AdminDetailEdit } from './AdminDetailEdit/AdminDetailEdit';

type Props = {
  ignoreItems?: string[];
  detailsName: string;
  metricsKey?: string;
  hasMetrics?: boolean;
  hasLogs?: boolean;
  additionalHeaderButtons?: React.ReactNode;
  customItemsAtEnd?: boolean;
  shouldRefresh?: boolean;
  onRefreshed?: VoidFunction;
  getItem: () => Promise<{}>;
  customItems?: (item: any) => AdminDetailProperty[];
  onOpenInApp?: () => void;
  onSaveChanges?: (
    properties: AdminDetailProperty[],
    onSuccess: VoidFunction,
    item?: any,
  ) => void;
  onDelete?: (onSuccess: VoidFunction) => void;
};

export const AdminDetail = ({
  ignoreItems,
  detailsName,
  metricsKey = 'id',
  hasMetrics,
  hasLogs,
  additionalHeaderButtons,
  customItemsAtEnd,
  shouldRefresh,
  onRefreshed,
  getItem,
  customItems,
  onOpenInApp,
  onSaveChanges,
  onDelete,
}: Props) => {
  const router = useRouter();
  const { name, ip, org_id } = router.query;
  const [error, setError] = useState('');
  const [item, setItem] = useState<any>();
  const [isEditMode, setIsEditMode] = useState(false);

  const properties: AdminDetailProperty[] =
    item &&
    Object.entries(item)
      .filter((property) => !ignoreItems?.some((item) => property[0] === item))
      .map((property) => {
        const label = capitalized(property[0]);
        const value: any = property[1];
        return {
          id: label,
          label,
          data:
            typeof value === 'object' && Boolean(Date.parse(value)) ? (
              <DateTime date={new Date(item.createdAt)} />
            ) : typeof value === 'object' ||
              typeof value === 'undefined' ? undefined : (
              value?.toString()
            ),
        };
      });

  if (properties && customItems) {
    if (customItemsAtEnd) {
      properties.push(...customItems(item));
    } else {
      properties.unshift(...customItems(item));
    }
  }

  const handleCopyObject = () =>
    copyToClipboard(JSON.stringify(item, undefined, 2));

  const handleRefresh = async () => {
    onRefreshed?.();

    try {
      if (ip && org_id) {
        const nodeResults = await nodeClient.listNodes(
          org_id as string,
          {
            keyword: ip as string,
          },
          {
            currentPage: 0,
            itemsPerPage: 1,
          },
        );
        const item = await nodeClient.getNode(nodeResults.nodes[0].id);
        setItem(item);
      } else {
        const item = await getItem();
        setItem(item);
      }
    } catch (err) {
      setItem({});
      setError('Cannot load data');
    }
  };

  const handleToggleEditMode = () => setIsEditMode(!isEditMode);

  const handleSaveChanges = (
    properties: AdminDetailProperty[],
    onSuccess: VoidFunction,
  ) => {
    onSaveChanges?.(properties, onSuccess, item);
  };

  useEffect(() => {
    handleRefresh();
  }, [isEditMode]);

  useEffect(() => {
    if (shouldRefresh) handleRefresh();
  }, [shouldRefresh]);

  return (
    <>
      <AdminDetailHeader
        name={name as string}
        isLoading={item === undefined}
        isEditMode={isEditMode}
        hasMetrics={hasMetrics}
        hasLogs={hasLogs}
        canEdit={Boolean(onSaveChanges)}
        detailsName={item ? item[detailsName] : undefined}
        identifier={item?.[metricsKey!]}
        additionalHeaderButtons={additionalHeaderButtons}
        onOpenAppView={onOpenInApp}
        onCopyObject={handleCopyObject}
        onToggleEditMode={handleToggleEditMode}
        onDelete={onDelete}
      />
      {error ? (
        <p css={spacing.top.medium}>{error}</p>
      ) : isEditMode ? (
        <AdminDetailEdit
          onSaveChanges={handleSaveChanges}
          onToggleEditMode={handleToggleEditMode}
          properties={properties.filter((property) => property.editSettings)}
        />
      ) : (
        <AdminDetailTable item={item!} properties={properties} />
      )}
    </>
  );
};
