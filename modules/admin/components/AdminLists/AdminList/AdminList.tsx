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
  const [searchTerm, setSearchTerm] = useState<string>();
  const [listPage, setListPage] = useState<number>();
  const [sortField, setSortField] = useState(
    +localStorage?.getItem(`${name}SortField`)! || defaultSortField,
  );
  const [sortOrder, setSortOrder] = useState(
    +localStorage?.getItem(`${name}SortOrder`)! || defaultSortOrder,
  );

  const loadColumns = () => {
    const localStorageColumns: AdminListColumn[] = JSON.parse(
      localStorage.getItem(`${name}Columns`)!,
    );

    let tempColumns = [...columns];

    if (localStorageColumns) {
      tempColumns.forEach((column) => {
        const isVisible = localStorageColumns?.find(
          (c: AdminListColumn) => c.name === column.name,
        )?.isVisible;

        column.isVisible = isVisible;

        if (column.filterSettings) {
          const foundLocalStorage = localStorageColumns?.find(
            (filter) =>
              filter.filterSettings?.type === column.filterSettings?.type,
          );
          column.filterSettings.values =
            foundLocalStorage?.filterSettings?.values!;
        }
      });
    }

    return tempColumns;
  };

  const [columnsState, setColumnsState] = useState(loadColumns());

  const handleGetList = async (
    keyword: string,
    page: number,
    sortField: number,
    sortOrder: SortOrder,
    filters?: AdminListColumn[],
  ) => {
    const response = await getList(
      keyword,
      page,
      sortField,
      sortOrder,
      filters,
    );
    setList(response.list);
    setListTotal(response.total);
    setIsLoading(false);
  };

  const handleSearch = async (keyword: string) => {
    const query: AdminQuery = {
      name,
      page: 1,
    };

    if (keyword?.length) query.search = keyword.trim();

    router.push({
      pathname: `/admin`,
      query,
    });
    setSearchTerm(keyword);
    setListPage(1);
  };

  const handleSortChanged = (field: number) => {
    const newSortOrder =
      sortField !== field
        ? SortOrder.SORT_ORDER_ASCENDING
        : sortOrder === SortOrder.SORT_ORDER_ASCENDING
        ? SortOrder.SORT_ORDER_DESCENDING
        : SortOrder.SORT_ORDER_ASCENDING!;

    setSortOrder(newSortOrder);
    setSortField(field);

    localStorage.setItem(`${name}SortField`, field.toString());
    localStorage.setItem(`${name}SortOrder`, newSortOrder.toString());

    const newColumns = [...columnsState];
    const foundColumn = newColumns.find((column) => column.sortField === field);

    if (!foundColumn) return;

    foundColumn.sortOrder = newSortOrder;

    setColumnsState(newColumns);
  };

  const handlePageChanged = (nextPage: number) => {
    setListPage(nextPage);
    const query: AdminQuery = {
      name,
      page: nextPage,
    };

    if (search) query.search = search as string;

    router.push({
      pathname: `/admin`,
      query,
    });
  };

  const handleColumnsChanged = (nextColumns: AdminListColumn[]) => {
    localStorage.setItem(`${name}Columns`, JSON.stringify(nextColumns));
    setColumnsState(nextColumns);
  };

  const handleFiltersChanged = (nextColumns: AdminListColumn[]) => {
    localStorage.setItem(`${name}Columns`, JSON.stringify(nextColumns));
    setColumnsState(nextColumns);
  };

  const handleFiltersApplied = () => {
    handleGetList(searchTerm!, 0, sortField!, sortOrder!, columnsState);
  };

  useEffect(() => {
    setSearchTerm((search as string) || '');
    setListPage(page ? +page?.toString()! : 1);
  }, [router.isReady]);

  useEffect(() => {
    if (searchTerm !== undefined && listPage !== undefined) {
      handleGetList(
        searchTerm!,
        listPage! - 1,
        sortField!,
        sortOrder!,
        columnsState,
      );
    }
  }, [searchTerm, listPage, sortField, sortOrder]);

  return (
    <article key={name} id={name} css={styles.card}>
      <AdminListHeader
        name={name}
        onSearch={handleSearch}
        columnsState={columnsState}
        onColumnsChanged={handleColumnsChanged}
        onFiltersChanged={handleFiltersChanged}
        onFiltersApplied={handleFiltersApplied}
      />
      <AdminListTable
        name={name}
        isLoading={isLoading}
        list={listMap(list)}
        listTotal={listTotal}
        listPage={listPage!}
        columnsState={columnsState}
        activeSortField={sortField}
        activeSortOrder={sortOrder}
        onPageChanged={handlePageChanged}
        onSortChanged={handleSortChanged}
        onFiltersChanged={handleFiltersChanged}
        onFiltersApplied={handleFiltersApplied}
      />
    </article>
  );
};
