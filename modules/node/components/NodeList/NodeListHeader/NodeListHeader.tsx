import { FC } from 'react';
import { styles } from './styles';

import { useRecoilState, useRecoilValue } from 'recoil';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { NodeFiltersHeaderIconText } from '../NodeFilters/NodeFiltersHeaderIconText';
import { NodeMetrics } from '@modules/node/components/NodeList/NodeMetrics/NodeMetrics';
import { Skeleton, GridTableViewPicker } from '@shared/components';

type Props = {
  totalRows: number;
};

export const NodeListHeader: FC<Props> = ({ totalRows }) => {
  const totalNodes = useRecoilValue(nodeAtoms.totalNodes);
  const [isFiltersCollapsed, setFiltersCollapsed] = useRecoilState(
    nodeAtoms.isFiltersCollapsed,
  );

  const [activeListType, setActiveListType] = useRecoilState(
    nodeAtoms.activeListType,
  );

  const handleFilterCollapseToggled = () => {
    localStorage.setItem('nodeFiltersCollapsed', JSON.stringify(false));
    setFiltersCollapsed(!isFiltersCollapsed);
  };

  const handleGridTableViewChanged = (type: string) => {
    setActiveListType(type);
  };

  return (
    <div css={styles.wrapper}>
      {isFiltersCollapsed && (
        <div css={styles.wrapperInner}>
          {totalNodes === null ? (
            <Skeleton width="65px" />
          ) : (
            <button
              onClick={handleFilterCollapseToggled}
              css={[styles.filterToggle, styles.endBlock]}
            >
              <NodeFiltersHeaderIconText />
            </button>
          )}
        </div>
      )}

      <div css={styles.endBlock}>
        <NodeMetrics />
      </div>

      <span css={styles.total}>
        {totalNodes === null ? (
          <Skeleton />
        ) : (
          <>
            Total: <span css={styles.totalValue}>{totalNodes} </span>
            {totalNodes === 1 ? 'node' : 'nodes'}
          </>
        )}
      </span>

      <div css={[styles.endBlock, styles.listTypePicker]}>
        <GridTableViewPicker
          onChange={handleGridTableViewChanged}
          activeListType={activeListType}
        />
      </div>
    </div>
  );
};
