import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styles } from './AdminList.styles';
import { AdminListHeader } from './AdminListHeader/AdminListHeader';
import { AdminListTable } from './AdminListTable/AdminListTable';

export type AdminListColumn = {
  name: string;
  width?: string;
  canCopy?: boolean;
};

export interface IAdminItem {
  id: string;
}

type Props = {
  name: string;
  icon: React.ReactNode;
  columns: AdminListColumn[];
  listMap: (list: any[]) => IAdminItem[];
  getTotal: () => Promise<number>;
  getList: (
    keyword?: string,
    page?: number,
  ) => Promise<{
    total: number;
    list: IAdminItem[];
  }>;
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
  const [list, setList] = useState<IAdminItem[]>([]);
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
        searchTerm={searchTerm}
        columns={columns}
        onPageChanged={handlePageChanged}
      />
    </article>
  );
};
