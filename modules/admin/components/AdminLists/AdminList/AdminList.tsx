import { useUpdateQueryString } from '@modules/admin/hooks';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { loadAdminColumns } from '@modules/admin/utils';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styles } from './AdminList.styles';
import { AdminListHeader } from './AdminListHeader/AdminListHeader';
import { AdminListTable } from './AdminListTable/AdminListTable';

type Props = {
  name: string;
  columns: AdminListColumn[];
  defaultSortField: number;
  defaultSortOrder: SortOrder;
  listMap: (list: any[]) => any[];
  getList: (
    keyword?: string,
    page?: number,
    sortField?: number,
    sortOrder?: number,
    filters?: AdminListColumn[],
  ) => Promise<{
    total: number;
    list: any[];
  }>;
};

type ListSettings = {
  listSearch: string;
  listPage: number;
  sortField: number;
  sortOrder: number;
  filters: AdminListColumn[];
};

export const AdminList = ({
  name,
  columns,
  defaultSortField,
  defaultSortOrder,
  listMap,
  getList,
}: Props) => {
  const router = useRouter();

  const { search, page } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [listTotal, setListTotal] = useState<number>();

  const { updateQueryString } = useUpdateQueryString(name);

  const [listSettings, setListSettings] = useState<ListSettings>({
    listSearch: (search as string) || '',
    listPage: page ? +page?.toString()! : 1,
    sortField: +localStorage?.getItem(`${name}SortField`)! || defaultSortField,
    sortOrder: +localStorage?.getItem(`${name}SortOrder`)! || defaultSortOrder,
    filters: loadAdminColumns(name, columns).filter(
      (column) => !!column.filterComponent,
    ),
  });

  const [columnsState, setColumnsState] = useState(
    loadAdminColumns(name, columns),
  );

  const { listSearch, listPage, sortField, sortOrder, filters } = listSettings;

  const handleGetList = async (
    keyword: string,
    page: number,
    sortField: number,
    sortOrder: SortOrder,
    filters?: AdminListColumn[],
  ) => {
    const response = await getList(
      keyword,
      page - 1,
      sortField,
      sortOrder,
      filters,
    );

    setList(response.list);
    setListTotal(response.total);
    setIsLoading(false);
  };

  const handleSearch = async (nextSearch: string) => {
    if (nextSearch === undefined) return;

    updateQueryString(1, nextSearch);

    setListSettings({
      ...listSettings,
      listSearch: nextSearch,
      listPage: 1,
    });

    handleGetList(nextSearch, 1, sortField, sortOrder, filters);
  };

  const handleSortChanged = (nextSortField: number) => {
    const nextSortOrder =
      sortField !== nextSortField
        ? SortOrder.SORT_ORDER_ASCENDING
        : sortOrder === SortOrder.SORT_ORDER_ASCENDING
        ? SortOrder.SORT_ORDER_DESCENDING
        : SortOrder.SORT_ORDER_ASCENDING!;

    setListSettings({
      ...listSettings,
      sortField: nextSortField,
      sortOrder: nextSortOrder,
    });

    localStorage.setItem(`${name}SortField`, nextSortField.toString());
    localStorage.setItem(`${name}SortOrder`, nextSortOrder.toString());

    const nextColumns = [...columnsState];
    const foundColumn = nextColumns.find(
      (column) => column.sortField === nextSortField,
    );

    if (!foundColumn) return;

    foundColumn.sortOrder = nextSortOrder;

    setColumnsState(nextColumns);

    handleGetList(listSearch, listPage, nextSortField, nextSortOrder, filters);
  };

  const handlePageChanged = (nextPage: number) => {
    setListSettings({
      ...listSettings,
      listPage: nextPage,
    });

    updateQueryString(nextPage, search as string);

    handleGetList(listSearch, nextPage, sortField, sortOrder, filters);
  };

  const handleColumnsChanged = (nextColumns: AdminListColumn[]) => {
    localStorage.setItem(`${name}Columns`, JSON.stringify(nextColumns));
    setColumnsState(nextColumns);
  };

  const handleFiltersChanged = (nextFilters: AdminListColumn[]) => {
    const nextColumns = [...columnsState];

    for (let column of nextColumns) {
      const indexOfFilter = nextFilters.findIndex(
        (c) => c.name === column.name,
      );
      if (indexOfFilter > -1) {
        column = nextFilters[indexOfFilter];
      }
    }

    localStorage.setItem(`${name}Columns`, JSON.stringify(nextColumns));
    setColumnsState(nextColumns);

    setListSettings({
      ...listSettings,
      filters: nextFilters,
      listPage: 1,
    });

    updateQueryString(1, search as string);

    handleGetList(listSearch, 1, sortField, sortOrder, nextFilters);
  };

  useEffect(() => {
    handleGetList(listSearch, listPage, sortField, sortOrder, filters);
  }, []);

  return (
    <article key={name} id={name} css={styles.card}>
      <AdminListHeader
        name={name}
        onSearch={handleSearch}
        columns={columnsState}
        onColumnsChanged={handleColumnsChanged}
        onFiltersChanged={handleFiltersChanged}
      />
      <AdminListTable
        name={name}
        isLoading={isLoading}
        list={listMap(list)}
        listTotal={listTotal}
        listPage={listPage!}
        columns={columnsState}
        activeSortField={sortField}
        activeSortOrder={sortOrder}
        onPageChanged={handlePageChanged}
        onSortChanged={handleSortChanged}
        onFiltersChanged={handleFiltersChanged}
      />
    </article>
  );
};
