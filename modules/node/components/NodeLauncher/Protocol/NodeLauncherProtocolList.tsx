import {
  ChangeEvent,
  useRef,
  useState,
  useMemo,
  useCallback,
  RefObject,
  useEffect,
} from 'react';
import { useRecoilValue } from 'recoil';
import { isMobile } from 'react-device-detect';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  filterSearch,
  useAccessibleGrid,
  useFlashlightGrid,
} from '@shared/index';
import {
  ListSearch,
  BlockchainIcon,
  EmptyColumn,
  TableSkeleton,
} from '@shared/components';
import { layoutSelectors } from '@modules/layout';
import {
  blockchainAtoms,
  useProtocolGrid,
  calculateColumnsPerPage,
} from '@modules/node';
import { styles } from './NodeLauncherProtocolList.styles';

export type NodeLauncherProtocolListProps<T = any> = {
  items: T[];
  selectedItem?: T | null;
  handleSelect?: (item: T) => void;
  wrapperRef?: RefObject<HTMLDivElement>;
  searchPlaceholder?: string;
};

export const NodeLauncherProtocolList = <
  T extends { id?: string; name?: string },
>({
  items,
  selectedItem,
  handleSelect,
  searchPlaceholder,
  wrapperRef,
}: NodeLauncherProtocolListProps<T>) => {
  const loadingState = useRecoilValue(blockchainAtoms.blockchainsLoadingState);
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<T[]>([]);

  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const { itemsPerPage } = useProtocolGrid(isSidebarOpen, wrapperRef);

  useFlashlightGrid(paginatedData, gridRef, cardsRef);

  const handleFocus = useCallback((focus: boolean) => {
    setIsFocused(focus);
  }, []);

  const columnsPerPage = calculateColumnsPerPage(isSidebarOpen);

  const { activeIndex, handleItemRef } = useAccessibleGrid({
    items: paginatedData,
    selectedItem,
    handleSelect,
    searchQuery,
    isFocused,
    handleFocus,
    gridRef,
    columnsPerPage,
  });

  const filteredData = useMemo(
    () => filterSearch<T>(items, searchQuery),
    [items, searchQuery],
  );

  // FILTERING
  useEffect(() => {
    if (!itemsPerPage) return;

    setCurrentPage(1);

    const newData = filteredData.slice(0, itemsPerPage);
    setPaginatedData(newData);
  }, [filteredData]);

  // RESIZING
  useEffect(() => {
    if (
      !itemsPerPage ||
      !filteredData.length ||
      paginatedData.length === filteredData.length
    )
      return;

    const start = paginatedData.length;
    const end =
      paginatedData.length < itemsPerPage
        ? itemsPerPage
        : (currentPage - 1) * itemsPerPage + itemsPerPage;

    const newData = filteredData.slice(start, end);
    setPaginatedData((prevData) => [...prevData, ...newData]);

    if (paginatedData.length > itemsPerPage) {
      const newCurrentPage = Math.ceil(paginatedData.length / itemsPerPage);
      setCurrentPage(newCurrentPage);
    }
  }, [itemsPerPage]);

  // LAZYLOADING
  useEffect(() => {
    if (!itemsPerPage || currentPage === 1) return;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const newdata = filteredData.slice(start, end);
    setPaginatedData((data) => [...data, ...newdata]);
  }, [currentPage]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleBlockchainSelected = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
      blockchain: T,
    ) => {
      e.preventDefault();
      handleSelect?.(blockchain);
    },
    [handleSelect],
  );

  const loadMore = () => setCurrentPage((prevPage) => prevPage + 1);

  return (
    <>
      <ListSearch
        name="search-list"
        value={searchQuery}
        handleChange={handleSearch}
        handleFocus={handleFocus}
        placeholder={searchPlaceholder}
      />

      <div id="protocol-list" css={styles.scrollbar}>
        {loadingState === 'initializing' ||
        (filteredData.length && !paginatedData.length) ? (
          <TableSkeleton />
        ) : paginatedData.length > 0 ? (
          <InfiniteScroll
            dataLength={paginatedData?.length}
            next={loadMore}
            hasMore={paginatedData.length < filteredData.length}
            scrollableTarget="protocol-list"
            scrollThreshold={0.75}
            loader={''}
          >
            <div ref={gridRef} css={styles.cards(isSidebarOpen)}>
              {paginatedData.map((item, index) => {
                const isActiveItem = item.id === selectedItem?.id;
                const isFocusedItem = !isMobile
                  ? index === activeIndex
                  : selectedItem?.id === item.id;

                return (
                  <div
                    key={item?.id}
                    ref={(el) => {
                      if (el && !cardsRef.current.includes(el)) {
                        cardsRef.current.push(el);
                      }
                      handleItemRef(el!, index);
                    }}
                    css={styles.card}
                    onClick={(e) => handleBlockchainSelected(e, item)}
                    className={`${isActiveItem ? ' active' : ''}${
                      isFocusedItem ? ' focus' : ''
                    }`}
                  >
                    <div
                      css={styles.cardContent}
                      className={isActiveItem ? 'active' : ''}
                    >
                      <BlockchainIcon
                        size="28px"
                        hideTooltip
                        blockchainName={item.name}
                      />
                      <p>{item.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <EmptyColumn
            title="No Blockchains."
            description="Please refine your search."
          />
        )}
      </div>
    </>
  );
};
