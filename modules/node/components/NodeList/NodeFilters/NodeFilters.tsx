import { styles } from './nodeFilters.styles';
import { styles as blockStyles } from './NodeFiltersBlock.styles';
import { Checkbox, Button } from '@shared/components';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { nodeAtoms, FilterItem } from '../../../store/nodeAtoms';
import { UIFilterCriteria as FilterCriteria } from '@modules/client/grpc_client';
import { NodeFiltersHeader } from './NodeFiltersHeader';
import { NodeFiltersBlock } from './NodeFiltersBlock';
import { apiClient } from '@modules/client';
import IconClose from '@public/assets/icons/close-12.svg';

export const NodeFilters = ({
  loadNodes,
}: {
  loadNodes: (filters?: FilterCriteria) => void;
}) => {
  const [blockchainList, setBlockchainList] = useState([]);

  const [filtersBlockchain, setFiltersBlockchain] = useRecoilState(
    nodeAtoms.filtersBlockchain,
  );

  const [filtersType, setFiltersType] = useRecoilState(nodeAtoms.filtersType);

  const [filtersStatus, setFiltersStatus] = useRecoilState(
    nodeAtoms.filtersStatus,
  );

  const [filtersHealth, setFiltersHealth] = useRecoilState(
    nodeAtoms.filtersHealth,
  );

  const isFiltersOpen = useRecoilValue(nodeAtoms.isFiltersOpen);
  const isFiltersCollapsed = useRecoilValue(nodeAtoms.isFiltersCollapsed);

  console.log('isFiltersOpen', isFiltersOpen);

  const [showMoreBlockchains, setShowMoreBlockchains] =
    useState<boolean>(false);

  const [showMoreTypes, setShowMoreTypes] = useState<boolean>(false);

  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);

  const [openFilterName, setOpenFilterName] =
    useState<string | 'Blockchain' | 'Status' | 'Type'>('');

  const handleShowMoreClicked = (
    value: boolean,
    setter: Dispatch<SetStateAction<boolean>>,
  ) => {
    setter(!value);
  };

  const loadLookups = async () => {
    const blockchains: any = await apiClient.getBlockchains();

    const mappedBlockchains: FilterItem[] = blockchains?.map((b: any) => ({
      id: b.id,
      name: b.name,
      isChecked: false,
    }));

    setFiltersBlockchain(mappedBlockchains);
  };

  const handleFilterChanged = (
    e: ChangeEvent<HTMLInputElement>,
    list: FilterItem[],
    setter: SetterOrUpdater<FilterItem[]>,
  ) => {
    const { target } = e;
    const { id, checked } = target;

    let listCopy = Array.from(list);
    let itemFound = { ...listCopy?.find((item) => item.name === id) };
    let itemIndex = listCopy.findIndex((item) => item.name === id);

    itemFound.isChecked = checked;
    listCopy.splice(itemIndex, 1, itemFound);

    setter(listCopy);
  };

  const handleResetClicked = async () => {
    setFiltersHealth(null);

    let filtersBlockchainCopy = filtersBlockchain.map((item) => ({
      id: item.id,
      name: item.name,
      isChecked: false,
    }));
    setFiltersBlockchain(filtersBlockchainCopy);

    let filtersStatusCopy = filtersStatus.map((item) => ({
      id: item.id,
      name: item.name,
      isChecked: false,
    }));
    setFiltersStatus(filtersStatusCopy);

    let filtersTypeCopy = filtersType.map((item) => ({
      id: item.id,
      name: item.name,
      isChecked: false,
    }));
    setFiltersType(filtersTypeCopy);

    handleUpdateClicked();
  };

  const handleUpdateClicked = () => {
    const blockchainFilters: string[] = filtersBlockchain
      .filter((item) => item.isChecked)
      .map((item) => item.id!);

    const typeFilters: string[] = filtersType
      .filter((item) => item.isChecked)
      .map((item) => item.id!);

    const statusFilters: string[] = filtersStatus
      .filter((item) => item.isChecked)
      .map((item) => item.id!);

    const params: FilterCriteria = {
      blockchain: blockchainFilters?.length ? blockchainFilters : undefined,
      node_type: typeFilters?.length ? typeFilters : undefined,
      node_status: statusFilters?.length ? statusFilters : undefined,
    };

    console.log('params', params);

    loadNodes(params);
  };

  const handleHealthChanged = (health: string) => {
    setFiltersHealth(filtersHealth === health ? null : health);
  };

  const handleFilterBlockClicked = (filterName: string) => {
    setOpenFilterName(filterName);
  };

  const handlePlusMinusClicked = (filterName: string, isOpen: boolean) => {
    if (isOpen) {
      setOpenFilterName('');
    } else {
      setOpenFilterName(filterName);
    }
  };

  const blockchainFilterCount = filtersBlockchain.filter(
    (item) => item.isChecked,
  ).length;

  const typeFilterCount = filtersType.filter((item) => item.isChecked).length;

  const statusFilterCount = filtersStatus?.filter(
    (item) => item.isChecked,
  ).length;

  const filters = [
    {
      name: 'Blockchain',
      filterCount: blockchainFilterCount,
      filterList: filtersBlockchain,
      setFilterList: setFiltersBlockchain,
      setShowMore: setShowMoreBlockchains,
      showMore: showMoreBlockchains,
    },
    {
      name: 'Status',
      filterCount: statusFilterCount,
      filterList: filtersStatus,
      setFilterList: setFiltersStatus,
      setShowMore: setShowMoreStatus,
      showMore: showMoreStatus,
    },
    {
      name: 'Type',
      filterCount: typeFilterCount,
      filterList: filtersType,
      setFilterList: setFiltersType,
      setShowMore: setShowMoreTypes,
      showMore: showMoreTypes,
    },
  ];

  useEffect(() => {
    loadLookups();
  }, []);

  return (
    <div
      css={[
        styles.outerWrapper,
        isFiltersCollapsed && styles.outerWrapperCollapsed,
      ]}
    >
      <NodeFiltersHeader />
      <div css={[styles.wrapper, isFiltersOpen && styles.wrapperOpen]}>
        <div css={styles.filters}>
          <div
            css={blockStyles.filterBlock}
            onClick={() => setOpenFilterName('')}
          >
            <label css={blockStyles.labelHeader}>
              <span css={blockStyles.labelText}>Health</span>
            </label>
            <div css={[blockStyles.checkboxList]}>
              <div css={blockStyles.checkboxRow}>
                <Checkbox
                  onChange={() => handleHealthChanged('online')}
                  name="healthOnline"
                  checked={filtersHealth === 'online'}
                >
                  Online
                </Checkbox>
              </div>
              <div css={blockStyles.checkboxRow}>
                <Checkbox
                  onChange={() => handleHealthChanged('offline')}
                  name="healthOffline"
                  checked={filtersHealth === 'offline'}
                >
                  Offline
                </Checkbox>
              </div>
            </div>
          </div>
          {filters.map((item) => (
            <NodeFiltersBlock
              isOpen={item.name === openFilterName}
              onPlusMinusClicked={handlePlusMinusClicked}
              onFilterBlockClicked={handleFilterBlockClicked}
              key={item.name}
              name={item.name}
              filterCount={item.filterCount}
              filterList={item.filterList}
              setFilterList={item.setFilterList}
              setShowMore={item.setShowMore}
              onFilterChanged={handleFilterChanged}
              onShowMoreClicked={() =>
                handleShowMoreClicked(item.showMore, item.setShowMore)
              }
              showMore={item.showMore}
            />
          ))}
          <Button
            display="block"
            style="outline"
            onClick={handleUpdateClicked}
            size="small"
          >
            Update
          </Button>
          <button
            css={styles.resetButton}
            type="button"
            onClick={handleResetClicked}
          >
            <IconClose />
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};
