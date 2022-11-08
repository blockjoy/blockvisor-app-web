import { FC } from 'react';
import { styles } from './nodeListHeader.styles';
import IconTable from '@public/assets/icons/table-12.svg';
import IconGrid from '@public/assets/icons/grid-12.svg';

type Props = {
  activeListType: string | 'table' | 'grid';
  onTypeChanged: (type: string) => void;
  totalRows: number;
};

export const NodeListHeader: FC<Props> = ({
  activeListType,
  onTypeChanged,
  totalRows,
}) => (
  <div css={styles.wrapper}>
    <span css={styles.total}>
      Showing <span css={styles.totalValue}>{totalRows} </span>
      {totalRows === 1 ? 'node' : 'nodes'}
    </span>
    <div css={[styles.listTypePicker]}>
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
