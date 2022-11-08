import { styles } from './nodeFilters.styles';
import IconFilter from '@public/assets/icons/filter-1-12.svg';
import { Checkbox, Button } from '@shared/components';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { nodeAtoms, FilterItem } from '../../../store/nodeAtoms';
import { FilterCriteria } from '@modules/client/grpc_client';

type FilterBlock = {
  name: string;
  filterCount: number;
  showMore: boolean;
  filterList: FilterItem[];
  setFilterList: SetterOrUpdater<FilterItem[]>;
  onShowMoreClicked: Dispatch<SetStateAction<boolean>>;
  setShowMore: Dispatch<SetStateAction<boolean>>;
  onFilterChanged: (
    e: ChangeEvent<HTMLInputElement>,
    list: FilterItem[],
    setter: SetterOrUpdater<FilterItem[]>,
  ) => void;
};

const FiltersBlock: FC<FilterBlock> = ({
  name,
  filterCount,
  showMore,
  filterList,
  onShowMoreClicked,
  onFilterChanged,
  setFilterList,
}) => {
  return (
    <>
      <label css={styles.label}>
        {name} {filterCount ? `(${filterCount})` : ''}
      </label>
      <div css={[styles.checkboxList, showMore && styles.checkboxListShowAll]}>
        {filterList?.map((item) => (
          <div css={styles.checkboxRow}>
            <Checkbox
              onChange={(e) => onFilterChanged(e, filterList, setFilterList)}
              name={item.name!}
              checked={item.isChecked}
            >
              {item.name}
            </Checkbox>
          </div>
        ))}
      </div>
      <button
        css={styles.showMore}
        type="button"
        onClick={() => onShowMoreClicked(showMore)}
      >
        Show {showMore ? 'Less' : 'More'}
      </button>
    </>
  );
};

export const NodeFilters = ({
  loadNodes,
}: {
  loadNodes: (filters?: FilterCriteria) => void;
}) => {
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

  const [showMoreBlockchains, setShowMoreBlockchains] =
    useState<boolean>(false);

  const [showMoreTypes, setShowMoreTypes] = useState<boolean>(false);

  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);

  const handleShowMoreClicked = (
    value: boolean,
    setter: Dispatch<SetStateAction<boolean>>,
  ) => {
    setter(!value);
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
      blockchain: blockchainFilters,
      node_type: typeFilters,
      node_status: statusFilters,
    };

    console.log('params', params);

    loadNodes(params);
  };

  const handleHealthChanged = (health: string) => {
    setFiltersHealth(filtersHealth === health ? null : health);
  };

  const blockchainFilterCount = filtersBlockchain.filter(
    (item) => item.isChecked,
  ).length;

  const typeFilterCount = filtersType.filter((item) => item.isChecked).length;

  const statusFilterCount = filtersStatus?.filter(
    (item) => item.isChecked,
  ).length;

  const totalFilterCount =
    Number(blockchainFilterCount > 0) +
    Number(typeFilterCount > 0) +
    Number(statusFilterCount > 0) +
    Number(!filtersHealth ? 0 : 1);

  return (
    <div css={styles.wrapper}>
      <header css={styles.header}>
        <IconFilter />
        Filters ({totalFilterCount})
      </header>
      <div css={styles.filters}>
        <label css={styles.label}>Health</label>
        <div css={[styles.checkboxList]}>
          <div css={styles.checkboxRow}>
            <Checkbox
              onChange={() => handleHealthChanged('online')}
              name="healthOnline"
              checked={filtersHealth === 'online'}
            >
              Online
            </Checkbox>
          </div>
          <div css={styles.checkboxRow}>
            <Checkbox
              onChange={() => handleHealthChanged('offline')}
              name="healthOffline"
              checked={filtersHealth === 'offline'}
            >
              Offline
            </Checkbox>
          </div>
        </div>
        <FiltersBlock
          name="Status"
          filterCount={statusFilterCount}
          filterList={filtersStatus}
          setFilterList={setFiltersStatus}
          setShowMore={setShowMoreStatus}
          onFilterChanged={handleFilterChanged}
          onShowMoreClicked={() =>
            handleShowMoreClicked(showMoreStatus, setShowMoreStatus)
          }
          showMore={showMoreStatus}
        />
        <FiltersBlock
          name="Blockchain"
          filterCount={blockchainFilterCount}
          filterList={filtersBlockchain}
          setFilterList={setFiltersBlockchain}
          setShowMore={setShowMoreBlockchains}
          onFilterChanged={handleFilterChanged}
          onShowMoreClicked={() =>
            handleShowMoreClicked(showMoreBlockchains, setShowMoreBlockchains)
          }
          showMore={showMoreBlockchains}
        />
        <FiltersBlock
          name="Type"
          filterCount={typeFilterCount}
          filterList={filtersType}
          setFilterList={setFiltersType}
          setShowMore={setShowMoreTypes}
          onFilterChanged={handleFilterChanged}
          onShowMoreClicked={() =>
            handleShowMoreClicked(showMoreTypes, setShowMoreTypes)
          }
          showMore={showMoreTypes}
        />

        <Button onClick={handleUpdateClicked} size="small">
          Update
        </Button>
      </div>
    </div>
  );
};
