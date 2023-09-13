import { FC, ReactNode } from 'react';
import { styles } from './tableGrid.styles';
import { SvgIcon } from '@shared/components/General';
import { Button } from '@shared/components';
import { spacing } from 'styles/utils.spacing.styles';
import { css } from '@emotion/react';
import IconMore from '@public/assets/icons/common/More.svg';
import IconDelete from '@public/assets/icons/common/Trash.svg';

type Props = {
  onCellClick?: VoidFunction;
  onDeleteClick?: VoidFunction;
  cellTitle: string;
  cellStatus: ReactNode;
  cellType?: string | ReactNode;
  cellIcon: ReactNode;
};

export const TableGridCell: FC<Props> = ({
  onCellClick,
  onDeleteClick,
  cellTitle,
  cellStatus,
  cellType,
  cellIcon,
}) => (
  <div
    onClick={onCellClick}
    css={[styles.cell, !onCellClick && styles.cellNotClickable]}
  >
    <div css={styles.cellLeft}>{cellIcon}</div>
    <div css={styles.cellCenter}>
      <header css={styles.cellHeader}>
        <h2 css={styles.cellTitle}>{cellTitle}</h2>
      </header>
      <div css={styles.cellEarnings}>{cellType}</div>
      {cellStatus}
    </div>
    <div css={styles.cellRight}>
      {onCellClick ? (
        <SvgIcon
          size="40px"
          isDefaultColor
          additionalStyles={[() => styles.moreIcon]}
        >
          <IconMore />
        </SvgIcon>
      ) : (
        <Button
          css={
            (spacing.left.large,
            css`
              width: 40px;
              height: 40px;
              max-height: 40px;
              align-self: start;
            `)
          }
          style="icon"
          tooltip="Delete"
          onClick={() => (!!onDeleteClick ? onDeleteClick() : null)}
        >
          <SvgIcon isDefaultColor>
            <IconDelete />
          </SvgIcon>
        </Button>
      )}
    </div>
  </div>
);
