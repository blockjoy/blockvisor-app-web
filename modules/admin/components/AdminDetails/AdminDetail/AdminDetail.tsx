import { capitalized } from '@modules/admin/utils/capitalized';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminDetailsHeader } from './AdminDetailsHeader/AdminDetailsHeader';
import { AdminDetailsTable } from './AdminDetailsTable/AdminDetailsTable';

type Props = {
  icon: React.ReactNode;
  detailsName: string;
  ignoreItems?: string[];
  getItem: () => Promise<any>;
  openInApp?: () => void;
};

export const AdminDetail = ({
  icon,
  ignoreItems,
  detailsName,
  getItem,
  openInApp,
}: Props) => {
  const router = useRouter();
  const { name } = router.query;
  const [error, setError] = useState('');
  const [item, setItem] = useState<any>();

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
      <AdminDetailsHeader
        name={name as string}
        icon={icon}
        isLoading={item === undefined}
        detailsName={item ? item[detailsName] : undefined}
        onOpenAppView={openInApp}
      />
      {!error ? (
        <AdminDetailsTable item={item!} ignoreItems={ignoreItems} />
      ) : (
        <p>{error}</p>
      )}
    </>
  );
};
