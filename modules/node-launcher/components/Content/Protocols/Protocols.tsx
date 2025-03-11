import {
  ChangeEvent,
  useRef,
  useState,
  useMemo,
  useCallback,
  RefObject,
  useEffect,
} from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isMobile } from 'react-device-detect';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  filterSearch,
  useAccessibleGrid,
  useFlashlightGrid,
} from '@shared/index';
import {
  Button,
  ListSearch,
  EmptyColumn,
  TableSkeleton,
} from '@shared/components';
import { protocolAtoms } from '@modules/node';
import { styles } from './Protocols.styles';
import { Protocol as IProtocol } from '@modules/grpc/library/blockjoy/v1/protocol';
import {
  PROTOCOL_PRESENTATION,
  PROTOCOL_PRESENTATION_DEFAULT,
} from '@modules/node-launcher/constants/protocols';
import { ProtocolIcon } from './ProtocolIcon/ProtocolIcon';
import { ProtocolsGrid } from './ProtocolsGrid/ProtocolsGrid';
import { ProtocolItem } from './ProtocolsGrid/ProtocolItem/ProtocolItem';
import { nodeLauncherAtoms } from '@modules/node-launcher';
import { NodeLauncherHeader } from '../../Header/NodeLauncherHeader';
import { NodeLauncherFooter } from '../../Footer/NodeLauncherFooter';

export type NodeLauncherProtocolListProps = {
  wrapperRef?: RefObject<HTMLDivElement>;
  searchPlaceholder?: string;
};

export const Protocols = ({
  searchPlaceholder,
  wrapperRef,
}: NodeLauncherProtocolListProps) => {
  const protocols = useRecoilValue(protocolAtoms.protocols);
  const loadingState = useRecoilValue(protocolAtoms.protocolsLoadingState);

  const [selectedProtocol, setSelectedProtocol] = useRecoilState(
    nodeLauncherAtoms.selectedProtocol,
  );
  const setCurrentStep = useSetRecoilState(nodeLauncherAtoms.currentStep);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<IProtocol[]>([]);

  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const itemsPerPage = 40;
  const columnsPerPage = 3;

  const handleSelect = (activeProtocol: IProtocol) => {
    setSelectedProtocol(activeProtocol);
  };

  useFlashlightGrid(paginatedData, gridRef, cardsRef);

  const handleFocus = useCallback((focus: boolean) => {
    setIsFocused(focus);
  }, []);

  const { activeIndex, handleItemRef } = useAccessibleGrid({
    items: paginatedData,
    selectedItem: selectedProtocol,
    handleSelect,
    searchQuery,
    isFocused,
    handleFocus,
    gridRef,
    columnsPerPage,
  });

  const filteredData = useMemo(
    () => filterSearch<IProtocol>(protocols, searchQuery),
    [protocols, searchQuery],
  );

  // FILTERING
  useEffect(() => {
    if (!itemsPerPage) return;

    setCurrentPage(1);

    const newData = filteredData.slice(0, itemsPerPage);
    console.log('FILTERING');
    setPaginatedData(newData);
  }, [filteredData]);

  // LAZYLOADING
  useEffect(() => {
    if (!itemsPerPage || currentPage === 1) return;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const newdata = filteredData.slice(start, end);
    console.log('LAZYLOADING');
    setPaginatedData((data) => [...data, ...newdata]);
  }, [currentPage]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleProtocolSelected = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
      protocol: IProtocol,
    ) => {
      e.preventDefault();
      handleSelect?.(protocol);
    },
    [handleSelect],
  );

  const loadMore = () => setCurrentPage((prevPage) => prevPage + 1);

  const handleStep = (step: NodeLauncherStep) => setCurrentStep(step);

  return (
    <>
      <NodeLauncherHeader
        title="Select Protocol"
        subtitle="Select provider you want to run a node on"
      >
        <ListSearch
          name="search-list"
          value={searchQuery}
          handleChange={handleSearch}
          handleFocus={handleFocus}
          placeholder={searchPlaceholder}
          additionalStyles={[styles.search]}
        />
      </NodeLauncherHeader>

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
            <ProtocolsGrid gridRef={gridRef}>
              {paginatedData.map((item, index) => {
                const isActive =
                  item.protocolId === selectedProtocol?.protocolId;
                const isFocused = !isMobile ? index === activeIndex : isActive;

                const protocolPresentation =
                  PROTOCOL_PRESENTATION.find((p) => p.key === item.key) ??
                  PROTOCOL_PRESENTATION_DEFAULT;

                return (
                  <ProtocolItem
                    key={item?.protocolId}
                    color={protocolPresentation.color}
                    isActive={isActive}
                    isFocused={isFocused}
                    handleClick={(e) => handleProtocolSelected(e, item)}
                    handleRef={(el) => {
                      if (el && !cardsRef.current.includes(el)) {
                        cardsRef.current.push(el);
                      }
                      handleItemRef(el!, index);
                    }}
                  >
                    <ProtocolIcon
                      Icon={protocolPresentation?.Icon}
                      color={protocolPresentation?.color}
                    />

                    <p>{item.name}</p>
                  </ProtocolItem>
                );
              })}
            </ProtocolsGrid>
          </InfiniteScroll>
        ) : (
          <EmptyColumn
            title="No Protocols."
            description="Please refine your search."
          />
        )}
      </div>

      {selectedProtocol && (
        <NodeLauncherFooter handleClick={() => handleStep('config')}>
          Next
        </NodeLauncherFooter>
      )}
    </>
  );
};
