import { FC } from 'react';
import { styles } from './nodeListHeader.styles';
import IconTable from '@public/assets/icons/table-12.svg';
import IconGrid from '@public/assets/icons/grid-12.svg';
import { NodeFiltersHeader } from '../NodeFilters/NodeFiltersHeader';
import { useRecoilState } from 'recoil';
import { nodeAtoms } from '@modules/node/store/nodeAtoms';
import { NodeFiltersHeaderIconText } from '../NodeFilters/NodeFiltersHeaderIconText';

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
        <button onClick={handleClick} css={styles.filterToggle}>
          <NodeFiltersHeaderIconText />
        </button>
      )}

      <span css={styles.total}>
        Showing <span css={styles.totalValue}>{totalRows} </span>
        {totalRows === 1 ? 'node' : 'nodes'}
      </span>
      <div css={[styles.listTypePicker, styles.endBlock]}>
        <button
          onClick={() => onTypeChanged('table')}
          css={[
            styles.iconButton,
            activeListType === 'table' && styles.iconButtonActive,
          ]}
        >
          <IconTable />
        </button>
        <button
          onClick={() => onTypeChanged('grid')}
          css={[
            styles.iconButton,
            activeListType === 'grid' && styles.iconButtonActive,
          ]}
        >
          <IconGrid />
        </button>
      </div>
    </div>
  );
};
