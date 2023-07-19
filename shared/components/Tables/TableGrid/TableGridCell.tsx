import { FC, ReactNode } from 'react';
import { styles } from './tableGrid.styles';
import IconMore from '@public/assets/icons/common/More.svg';

type Props = {
  onCellClick: VoidFunction;
  cellTitle: string;
  cellStatus: ReactNode;
  cellType?: string | ReactNode;
  cellEarnings?: number;
  cellIcon: ReactNode;
  cellEarningsDirection?: string | 'up' | 'down' | '-';
  dataCy?: string;
};

export const TableGridCell: FC<Props> = ({
  onCellClick,
  cellTitle,
  cellStatus,
  cellType,
  cellIcon,
  cellEarnings = 11.24,
  cellEarningsDirection = '-',
  dataCy,
}) => (
  <div data-cy={dataCy} onClick={onCellClick} css={styles.cell}>
    <div css={styles.cellIcon}>{cellIcon}</div>
    <div css={styles.cellRight}>
      <header css={styles.cellHeader}>
        <h2 css={styles.cellTitle}>{cellTitle}</h2>
        <span css={styles.cellMoreIcon}>
          <IconMore />
        </span>
      </header>
      <div css={styles.cellEarnings}>
        {cellType || `$${cellEarnings.toFixed(2)} ${cellEarningsDirection}`}
      </div>
      <div css={styles.cellStatus}>{cellStatus}</div>
    </div>
  </div>
);
