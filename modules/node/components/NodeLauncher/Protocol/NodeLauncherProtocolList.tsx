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
  useAccessibleList,
  useFlashlightGrid,
} from '@shared/index';
import {
  ListSearch,
  BlockchainIcon,
  EmptyColumn,
  TableSkeleton,
} from '@shared/components';
import { layoutSelectors } from '@modules/layout';
import { blockchainAtoms, useProtocolGrid } from '@modules/node';
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
  const [isLoading, setIsLoading] = useState(true);
  const isSidebarOpen = useRecoilValue(layoutSelectors.isSidebarOpen);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<T[]>([]);

  const listRef = useRef<HTMLUListElement>(null);
  const cardsRef = useRef<HTMLLIElement[]>([]);

  const { itemsPerPage } = useProtocolGrid(isSidebarOpen, wrapperRef);

  useFlashlightGrid(paginatedData, listRef, cardsRef);

  const handleFocus = useCallback((focus: boolean) => {
    setIsFocused(focus);
  }, []);

  const { activeIndex, handleItemRef } = useAccessibleList({
    items: paginatedData,
    selectedItem,
    handleSelect,
    searchQuery,
    isFocused,
    handleFocus,
    listRef,
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

    if (isLoading) setIsLoading(false);
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

      {loadingState === 'initializing' || isLoading ? (
        <TableSkeleton />
      ) : paginatedData.length > 0 ? (
        <div id="protocol-list" css={styles.scrollbar}>
          <InfiniteScroll
            dataLength={paginatedData?.length}
            next={loadMore}
            hasMore={paginatedData.length < filteredData.length}
            scrollableTarget="protocol-list"
            scrollThreshold={0.75}
            loader={''}
          >
            <ul ref={listRef} css={styles.cards(isSidebarOpen)}>
              {paginatedData.map((item, index) => {
                const isActiveItem = item.id === selectedItem?.id;
                const isFocusedItem = !isMobile
                  ? index === activeIndex
                  : selectedItem?.id === item.id;

                return (
                  <li
                    key={item?.id}
                    ref={(el) => {
                      if (el && !cardsRef.current.includes(el)) {
                        cardsRef.current.push(el);
                      }
                      handleItemRef(el!, index);
                    }}
                  >
                    <div
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
                  </li>
                );
              })}
            </ul>
          </InfiniteScroll>
        </div>
      ) : (
        <EmptyColumn
          title="No Blockchains."
          description="Please refine your search."
        />
      )}
    </>
  );
};
