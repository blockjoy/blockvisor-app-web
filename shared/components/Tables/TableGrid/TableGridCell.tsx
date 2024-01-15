import { FC, ReactNode } from 'react';
import { styles } from './TableGridCell.styles';
import { SvgIcon } from '@shared/components/General';
import IconMore from '@public/assets/icons/common/More.svg';

type Props = {
  onCellClick?: VoidFunction;
  cellTitle: string;
  cellStatus: ReactNode;
  cellType?: string | ReactNode;
  cellIcon: ReactNode;
};

export const TableGridCell: FC<Props> = ({
  onCellClick,
  cellTitle,
  cellStatus,
  cellType,
  cellIcon,
}) => (
  <div
    onClick={onCellClick}
    css={[styles.cell, !onCellClick && styles.cellNotClickable]}
  >
    <div css={styles.cellLeft}>
      <SvgIcon size="16px">{cellIcon}</SvgIcon>
    </div>
    <div css={styles.cellCenter}>
      <header css={styles.cellHeader}>
        <h2 css={styles.cellTitle}>{cellTitle}</h2>
      </header>
      <div css={styles.cellMiddle}>{cellType}</div>
      {cellStatus}
    </div>
    <div css={styles.cellRight}>
      <SvgIcon
        size="16px"
        isDefaultColor
        additionalStyles={[() => styles.moreIcon]}
      >
        <IconMore />
      </SvgIcon>
    </div>
  </div>
);
