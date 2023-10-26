import { Host } from '@modules/grpc/library/blockjoy/v1/host';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { User } from '@modules/grpc/library/blockjoy/v1/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminGetList } from '../AdminLists';
import { styles } from './AdminList.styles';
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
  getList: (keyword?: string, page?: number) => Promise<AdminGetList>;
};

export const AdminList = ({
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
  const [total, setTotal] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [listPage, setListPage] = useState<number>();

  const handleGetTotal = async () => {
    const response = await getTotal();
    setTotal(response);
  };

  const handleGetList = async (keyword: string, page: number) => {
    const response = await getList(keyword, page);
    setList(response.list);
    setListTotal(response.total);
  };

  const handleSearch = async (keyword: string) => {
    router.push({
      pathname: `/admin`,
      query: {
        name,
        page: 0,
        search: keyword.trim(),
      },
    });
    setSearchTerm(keyword);
    setListPage(0);
  };

  const handlePageChanged = (page: number) => {
    router.push({
      pathname: `/admin`,
      query: {
        name,
        page,
        search,
      },
    });
    setListPage(page);
  };

  useEffect(() => {
    (async () => {
      setSearchTerm((search as string) || '');
      setListPage(page ? +page?.toString()! : 0);
    })();
  }, [router.isReady]);

  useEffect(() => {
    if (searchTerm !== undefined && listPage !== undefined) {
      handleGetTotal();
      handleGetList(searchTerm!, listPage!);
    }
  }, [searchTerm, listPage]);

  return (
    <article key={name} id={name} css={styles.card}>
      <AdminListHeader
        name={name}
        icon={icon}
        total={total!}
        onSearch={handleSearch}
      />
      <AdminListTable
        name={name}
        list={listMap(list)}
        listTotal={listTotal}
        listPage={listPage!}
        columns={columns}
        onPageChanged={handlePageChanged}
      />
    </article>
  );
};
