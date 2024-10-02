import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { useSettings } from '@modules/settings';
import { useUpdateQueryString } from '@modules/admin/hooks';
import { adminSelectors, loadAdminColumns } from '@modules/admin';
import { AdminListColumn } from '@modules/admin/types/AdminListColumn';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { styles } from './AdminList.styles';
import { AdminListHeader } from './AdminListHeader/AdminListHeader';
import { AdminListTable } from './AdminListTable/AdminListTable';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';

type Props = {
  name: keyof AdminSettings;
  columns: AdminListColumn[];
  hidePagination?: boolean;
  defaultSortField: number;
  defaultSortOrder: SortOrder;
  additionalHeaderButtons?: FunctionComponent<{
    selectedIds: string[];
    list: any[];
    setList: Dispatch<SetStateAction<any[]>>;
  }>[];
  selectedIds?: string[];
  tagsAdded?: AdminTags[];
  tagsRemoved?: AdminTags[];
  blockchains?: Blockchain[];
  setTagsAdded?: Dispatch<SetStateAction<AdminTags[]>>;
  setTagsRemoved?: Dispatch<SetStateAction<AdminTags[]>>;
  onIdSelected?: (id: string, isSelected: boolean) => void;
  onIdAllSelected?: (ids: string[]) => void;
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
  hidePagination,
  defaultSortField,
  defaultSortOrder,
  selectedIds,
  additionalHeaderButtons,
  tagsAdded,
  tagsRemoved,
  blockchains,
  setTagsAdded,
  setTagsRemoved,
  onIdSelected,
  onIdAllSelected,
  listMap,
  getList,
}: Props) => {
  const router = useRouter();

  const { search, page } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [listAll, setListAll] = useState<any[]>([]);
  const [listTotal, setListTotal] = useState<number>();

  const { updateQueryString } = useUpdateQueryString(name);

  const settings = useRecoilValue(adminSelectors.settings);
  const settingsColumns = settings[name]?.columns ?? [];

  const [columnsState, setColumnsState] = useState<AdminListColumn[]>([]);

  const [listSettings, setListSettings] = useState<ListSettings>({
    listSearch: (search as string) || '',
    listPage: page ? +page?.toString()! : 1,
    sortField: settings[name]?.sort?.field || defaultSortField,
    sortOrder: settings[name]?.sort?.order || defaultSortOrder,
    filters: settingsColumns.filter((column) => !!column.filterComponent),
  });

  const { listSearch, listPage, sortField, sortOrder, filters } = listSettings;

  const { updateSettings } = useSettings();

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

    if (columns.some((column) => !!column.filterSettings)) {
      const everythingResponse = await getList(
        keyword,
        -1,
        undefined,
        undefined,
        undefined,
      );

      setListAll(everythingResponse.list);
    }
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

    const nextColumns = [...columnsState];
    const foundColumn = nextColumns.find(
      (column) => column.sortField === nextSortField,
    );

    updateSettings('admin', {
      [name]: {
        columns: foundColumn ? nextColumns : settings[name]?.columns,
        sort: {
          field: nextSortField,
          order: nextSortOrder,
        },
      },
    });

    if (!foundColumn) return;

    setColumnsState(nextColumns);
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
    updateSettings('admin', {
      [name]: {
        ...settings[name],
        columns: nextColumns,
      },
    });
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

    updateSettings('admin', {
      [name]: {
        ...settings[name],
        columns: nextColumns,
      },
    });

    setColumnsState(nextColumns);

    setListSettings({
      ...listSettings,
      filters: nextFilters,
      listPage: 1,
    });

    updateQueryString(1, search as string);
  };

  const initSettingsColumns = () => {
    if (!!settings[name]) return;

    updateSettings('admin', {
      [name]: {
        ...settings[name],
        columns,
      },
    });
  };

  useEffect(() => {
    const adminColumns = loadAdminColumns(columns, settingsColumns);
    setColumnsState(adminColumns);
    setListSettings({
      ...listSettings,
      filters: adminColumns.filter((col) => !!col.filterSettings),
    });
  }, []);

  useEffect(() => {
    initSettingsColumns();
    if (columnsState.length) {
      handleGetList(listSearch, listPage, sortField, sortOrder, filters);
    }
  }, [listSettings]);

  useEffect(() => {
    if (tagsAdded?.length) {
      const listCopy = [...list];

      tagsAdded?.forEach((tag) => {
        const foundListItem = listCopy.find((item) => item.id === tag.id);

        if (foundListItem) {
          foundListItem.tags = {
            tags: [
              ...foundListItem.tags.tags,
              ...tag.tags.map((t) => ({
                name: t,
              })),
            ],
          };
        }
      });

      setList(listCopy);
      setTagsAdded?.([]);
    }
  }, [tagsAdded]);

  useEffect(() => {
    if (tagsRemoved?.length) {
      const listCopy = [...list];

      tagsRemoved?.forEach((tag) => {
        const foundListItem = listCopy.find((item) => item.id === tag.id);

        if (foundListItem) {
          foundListItem.tags = {
            tags: tag.tags.map((t) => ({
              name: t,
            })),
          };
        }
      });

      setList(listCopy);
      setTagsRemoved?.([]);
    }
  }, [tagsRemoved]);

  return (
    <article key={name} id={name} css={styles.card}>
      <AdminListHeader
        name={name}
        onSearch={handleSearch}
        columns={columnsState}
        onColumnsChanged={handleColumnsChanged}
        onFiltersChanged={handleFiltersChanged}
        additionalHeaderButtons={additionalHeaderButtons}
        selectedIds={selectedIds!}
        list={list}
        setList={setList}
      />
      <AdminListTable
        name={name}
        isLoading={isLoading}
        list={listMap(list)}
        listTotal={listTotal}
        listPage={listPage!}
        listAll={listAll}
        columns={columnsState}
        hidePagination={hidePagination}
        activeSortField={sortField}
        activeSortOrder={sortOrder}
        selectedIds={selectedIds}
        blockchains={blockchains}
        onIdSelected={onIdSelected}
        onIdAllSelected={onIdAllSelected}
        onPageChanged={handlePageChanged}
        onSortChanged={handleSortChanged}
        onFiltersChanged={handleFiltersChanged}
        onColumnsChanged={handleColumnsChanged}
      />
    </article>
  );
};
