import { FC } from 'react';
import { styles } from './nodeListHeader.styles';

import { NodeFiltersHeader } from '../NodeFilters/NodeFiltersHeader';
import { useRecoilState } from 'recoil';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { NodeFiltersHeaderIconText } from '../NodeFilters/NodeFiltersHeaderIconText';
import { NodeMetrics } from '@modules/node/components/NodeList/NodeMetrics/NodeMetrics';

type Props = {
  activeListType: string | 'table' | 'grid';
  onTypeChanged: (type: string) => void;
  totalRows: number;
};

export const NodeListHeader: FC<Props> = ({
  activeListType,
  onTypeChanged,
  totalRows,
}) => {
  const [isFiltersCollapsed, setFiltersCollapsed] = useRecoilState(
    nodeAtoms.isFiltersCollapsed,
  );

  const handleClick = () => {
    setFiltersCollapsed(!isFiltersCollapsed);
  };

  return (
    <div css={styles.wrapper}>
      {/* <div css={[styles.filterToggle, styles.endBlock]}>
      <NodeFiltersHeader />
    </div> */}

      {isFiltersCollapsed && (
        <button
          onClick={handleClick}
          css={[styles.filterToggle, styles.endBlock]}
        >
          <NodeFiltersHeaderIconText />
        </button>
      )}

      <NodeMetrics />

      <span css={[styles.total, styles.endBlock]}>
        Showing <span css={styles.totalValue}>{totalRows} </span>
        {totalRows === 1 ? 'node' : 'nodes'}
      </span>
    </div>
  );
};
