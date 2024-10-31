import { SerializedStyles } from '@emotion/react';
import { styles } from './TableGridCell.styles';
import { SvgIcon } from '@shared/components/General';

type Props = {
  onCellClick?: VoidFunction;
  titleText: string;
  titleIcon: React.ReactNode;
  topRow?: React.ReactNode | string;
  middleRow?: React.ReactNode | string;
  bottomRow?: React.ReactNode | string;
  footer?: React.ReactNode | string;
  titleStyle?: SerializedStyles;
};

export const TableGridCell = ({
  onCellClick,
  titleText,
  titleIcon,
  topRow,
  middleRow,
  bottomRow,
  footer,
  titleStyle,
}: Props) => (
  <div
    onClick={onCellClick}
    css={[styles.cell, !onCellClick && styles.cellNotClickable]}
  >
    <div css={styles.cellLeft}>
      <SvgIcon size="16px">{titleIcon}</SvgIcon>
    </div>
    <div css={styles.cellCenter}>
      <header css={[styles.cellHeader, titleStyle && titleStyle]}>
        <h2 css={styles.cellTitle}>{titleText}</h2>
      </header>
      {topRow && topRow}
      {middleRow && <div css={styles.cellMiddle}>{middleRow}</div>}
      {bottomRow && <div css={styles.cellBottom}>{bottomRow}</div>}
      {footer && <div css={styles.cellFooter}>{footer}</div>}
    </div>
  </div>
);
