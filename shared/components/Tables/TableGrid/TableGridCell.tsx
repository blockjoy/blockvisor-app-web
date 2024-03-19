import { FC, ReactNode } from 'react';
import { styles } from './TableGridCell.styles';
import { SvgIcon } from '@shared/components/General';
import IconMore from '@public/assets/icons/common/More.svg';

type Props = {
  onCellClick?: VoidFunction;
  titleText: string;
  titleIcon: ReactNode;
  middleRow?: ReactNode | string;
  bottomRow?: ReactNode | string;
  footer?: ReactNode | string;
};

export const TableGridCell: FC<Props> = ({
  onCellClick,
  titleText,
  titleIcon,
  middleRow,
  bottomRow,
  footer,
}) => (
  <div
    onClick={onCellClick}
    css={[styles.cell, !onCellClick && styles.cellNotClickable]}
  >
    <div css={styles.cellLeft}>
      <SvgIcon size="16px">{titleIcon}</SvgIcon>
    </div>
    <div css={styles.cellCenter}>
      <header css={styles.cellHeader}>
        <h2 css={styles.cellTitle}>{titleText}</h2>
      </header>
      <div css={styles.cellMiddle}>{middleRow}</div>
      <div css={styles.cellBottom}>{bottomRow}</div>
      <div css={styles.cellFooter}>{footer}</div>
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
