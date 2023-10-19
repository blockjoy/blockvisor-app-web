import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminGetList } from '../AdminList';
import { styles } from './AdminListView.styles';
import { AdminListHeader } from './AdminListHeader/AdminListHeader';
import { AdminListTable } from './AdminListTable/AdminListTable';

export type AdminListColumn = {
  name: string;
  width?: string;
};

export type AdminSupportedViews = Node[] | User[] | Host[] | Org[];

type Props = {
  name: string;
  icon: React.ReactNode;
  columns: AdminListColumn[];
  listMap: (list: AdminSupportedViews) => AdminSupportedViews;
  getTotal: () => Promise<number>;
  getList: (searchTerm?: string, page?: number) => Promise<AdminGetList>;
};

export const AdminListView = ({
  name,
  icon,
  columns,
  listMap,
  getTotal,
  getList,
}: Props) => {
  const router = useRouter();
  const { search, page } = router.query;
  const [list, setList] = useState<AdminSupportedViews>([]);
  const [listTotal, setListTotal] = useState<number>();
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [listPage, setListPage] = useState(0);

  const handleGetTotal = async () => {
    const response = await getTotal();
    setTotal(response);
  };

  const handleGetList = async (search: string, page: number) => {
    const response = await getList(search, page);
    setList(response.list);
    setListTotal(response.total);
  };

  const handleSearch = async (search: string) => {
    setSearchTerm(search);
    setListPage(0);
  };

  const handlePageChanged = (page: number) => {
    router.push({
      pathname: `/admin`,
      query: {
        search,
        name,
        page,
      },
    });
    setListPage(page);
  };

  useEffect(() => {
    (async () => {
      if (search) setSearchTerm(search as string);
      if (page) setListPage(+page?.toString()!);
      handleGetTotal();
    })();
  }, []);

  useEffect(() => {
    handleGetList(searchTerm, listPage);
  }, [listPage, searchTerm]);

  return (
    <article key={name} id={name} css={styles.card}>
      <AdminListHeader
        name={name}
        icon={icon}
        total={total}
        onSearch={handleSearch}
      />
      <AdminListTable
        name={name}
        list={listMap(list)}
        listTotal={listTotal}
        listPage={listPage}
        columns={columns}
        onPageChanged={handlePageChanged}
      />
    </article>
  );
};
