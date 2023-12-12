import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styles } from './AdminList.styles';
import { AdminListHeader } from './AdminListHeader/AdminListHeader';
import { AdminListTable } from './AdminListTable/AdminListTable';

export type AdminListColumn = {
  name: string;
  width?: string;
  canCopy?: boolean;
  sortField?: number;
  sortOrder?: SortOrder;
  displayName?: string;
};

export interface IAdminItem {
  id: string;
}

type Props = {
  name: string;
  columns: AdminListColumn[];
  defaultSortField: number;
  defaultSortOrder: SortOrder;
  listMap: (list: any[]) => IAdminItem[];
  getTotal: () => Promise<number>;
  getList: (
    keyword?: string,
    page?: number,
    sortField?: number,
    sortOrder?: number,
  ) => Promise<{
    total: number;
    list: IAdminItem[];
  }>;
};

export const AdminList = ({
  name,
  columns,
  defaultSortField,
  defaultSortOrder,
  listMap,
  getTotal,
  getList,
}: Props) => {
  const router = useRouter();
  const { search, page, field, order } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<IAdminItem[]>([]);
  const [listTotal, setListTotal] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [listPage, setListPage] = useState<number>();
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const [columnsState, setColumnsState] = useState(columns);

  const handleGetTotal = async () => {
    const response = await getTotal();
    setTotal(response);
  };

  const handleGetList = async (
    keyword: string,
    page: number,
    sortField: number,
    sortOrder: SortOrder,
  ) => {
    const response = await getList(keyword, page, sortField, sortOrder);
    setList(response.list);
    setListTotal(response.total);
    setIsLoading(false);
  };

  const handleSearch = async (keyword: string) => {
    router.push({
      pathname: `/admin`,
      query: {
        name,
        page: 0,
        search: keyword.trim(),
        field,
        order,
      },
    });
    setSearchTerm(keyword);
    setListPage(0);
  };

  const handleSortChanged = (sortField: number, sortOrder: SortOrder) => {
    setSortField(sortField);

    const newSortOrder =
      sortOrder === SortOrder.SORT_ORDER_ASCENDING
        ? SortOrder.SORT_ORDER_DESCENDING
        : SortOrder.SORT_ORDER_ASCENDING!;

    setSortOrder(newSortOrder);

    const columnsStateCopy = [...columnsState];

    const foundColumn = columnsStateCopy.find(
      (column) => column.sortField === sortField,
    );

    if (!foundColumn) return;

    foundColumn.sortOrder = newSortOrder;

    setColumnsState(columnsStateCopy);

    router.push({
      pathname: `/admin`,
      query: {
        name,
        page,
        search,
        field: sortField,
        order: newSortOrder,
      },
    });
    console.log('handleSortChanged', sortField, newSortOrder);
  };

  const handlePageChanged = (page: number) => {
    setListPage(page);
    router.push({
      pathname: `/admin`,
      query: {
        name,
        page,
        search,
        field,
        order,
      },
    });
  };

  useEffect(() => {
    (async () => {
      setSearchTerm((search as string) || '');
      setListPage(page ? +page?.toString()! : 0);
      setSortField(field ? +field?.toString()! : defaultSortField);
      setSortOrder(order ? +order?.toString()! : defaultSortOrder);
    })();
  }, [router.isReady]);

  useEffect(() => {
    if (searchTerm !== undefined && listPage !== undefined) {
      handleGetTotal();
      handleGetList(searchTerm!, listPage!, sortField!, sortOrder!);
    }
  }, [searchTerm, listPage, sortField, sortOrder]);

  return (
    <article key={name} id={name} css={styles.card}>
      <AdminListHeader name={name} onSearch={handleSearch} />
      <AdminListTable
        name={name}
        isLoading={isLoading}
        list={listMap(list)}
        listTotal={listTotal}
        listPage={listPage!}
        searchTerm={searchTerm}
        columns={columnsState}
        activeSortField={sortField}
        activeSortOrder={sortOrder}
        onPageChanged={handlePageChanged}
        onSortChanged={handleSortChanged}
      />
    </article>
  );
};
