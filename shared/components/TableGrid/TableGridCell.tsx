import { FC, ReactNode } from 'react';
import { styles } from './tableGrid.styles';
import IconMore from '@public/assets/icons/more-16.svg';

type Props = {
  onCellClick: VoidFunction;
  cellTitle: string;
  cellStatus: ReactNode;
  cellEarnings?: number;
  cellEarningsDirection?: string | 'up' | 'down' | '-';
};

export const TableGridCell: FC<Props> = ({
  onCellClick,
  cellTitle,
  cellStatus,
  cellEarnings = 11.24,
  cellEarningsDirection = '-',
}) => (
  <div onClick={onCellClick} css={styles.cell}>
    <header css={styles.cellHeader}>
      <h2 css={styles.cellTitle}>{cellTitle}</h2>
      <span css={styles.cellMoreIcon}>
        <IconMore />
      </span>
    </header>
    <div css={styles.cellEarnings}>
      ${cellEarnings.toFixed(2)} {cellEarningsDirection}
    </div>
    <div css={styles.cellStatus}>{cellStatus}</div>
  </div>
);
