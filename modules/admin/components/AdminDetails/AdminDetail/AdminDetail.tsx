import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
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

export type AdminDetailItem = Node & User & Host & Org;

type Props = {
  icon: React.ReactNode;
  ignoreItems?: string[];
  detailsName: string;
  getItem: () => Promise<{}>;
  customItems?: (item: any) => AdminDetailProperty[];
  onOpenInApp?: () => void;
};

export const AdminDetail = ({
  icon,
  ignoreItems,
  detailsName,
  getItem,
  customItems,
  onOpenInApp,
}: Props) => {
  const router = useRouter();
  const { name } = router.query;
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
        const item = await getItem();
        setItem(item);
      } catch (err) {
        setItem({});
        setError(`${capitalized(name as string)} not found`);
      }
    })();
  }, []);

  return (
    <>
      <AdminDetailHeader
        name={name as string}
        icon={icon}
        isLoading={item === undefined}
        detailsName={item ? item[detailsName] : undefined}
        onOpenAppView={onOpenInApp}
        onCopyObject={handleCopyObject}
      />
      {!error ? (
        <AdminDetailTable item={item!} properties={properties} />
      ) : (
        <p>{error}</p>
      )}
    </>
  );
};
