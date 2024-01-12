import { capitalized } from '@modules/admin/utils/capitalized';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminDetailHeader } from './AdminDetailHeader/AdminDetailHeader';
import {
  AdminDetailProperty,
  AdminDetailTable,
} from './AdminDetailTable/AdminDetailTable';
import { formatters } from '@shared/utils/formatters';
import { copyToClipboard } from '@shared/utils/copyToClipboard';
import { nodeClient } from '@modules/grpc';
import { spacing } from 'styles/utils.spacing.styles';

type Props = {
  ignoreItems?: string[];
  detailsName: string;
  getItem: () => Promise<{}>;
  customItems?: (item: any) => AdminDetailProperty[];
  onOpenInApp?: () => void;
};

export const AdminDetail = ({
  ignoreItems,
  detailsName,
  getItem,
  customItems,
  onOpenInApp,
}: Props) => {
  const router = useRouter();
  const { name, ip, org_id } = router.query;
  const [error, setError] = useState('');
  const [item, setItem] = useState<any>();

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
            typeof value === 'object' && Boolean(Date.parse(value))
              ? `${formatters.formatDate(
                  item.createdAt!,
                )} @ ${formatters.formatDate(item.createdAt!, 'time')}`
              : typeof value === 'object' || typeof value === 'undefined'
              ? undefined
              : value?.toString(),
        };
      });

  if (properties && customItems) {
    properties.unshift(...customItems(item));
  }

  const handleCopyObject = () => {
    copyToClipboard(JSON.stringify(item, undefined, 2));
  };

  useEffect(() => {
    (async () => {
      try {
        if (ip && org_id) {
          const nodeResults = await nodeClient.listNodes(
            org_id as string,
            {
              keyword: ip as string,
            },
            {
              current_page: 0,
              items_per_page: 1,
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
    })();
  }, []);

  return (
    <>
      <AdminDetailHeader
        name={name as string}
        isLoading={item === undefined}
        detailsName={item ? item[detailsName] : undefined}
        onOpenAppView={onOpenInApp}
        onCopyObject={handleCopyObject}
      />
      {!error ? (
        <AdminDetailTable item={item!} properties={properties} />
      ) : (
        <p css={spacing.top.medium}>{error}</p>
      )}
    </>
  );
};
