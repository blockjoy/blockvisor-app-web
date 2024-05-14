import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { PropsWithChildren } from 'react';
import { styles } from './AdminListTableSortButton.styles';
import { SvgIcon } from '@shared/components';
import IconArrowDown from '@public/assets/icons/common/ArrowDown.svg';

type Props = {
  sortField?: number;
  sortOrder?: SortOrder;
  activeSortField: number;
  activeSortOrder: SortOrder;
  onClick: (sortField: number, sortOrder: SortOrder) => void;
} & PropsWithChildren;

export const AdminListTableSortButton = ({
  sortField,
  sortOrder,
  activeSortField,
  activeSortOrder,
  onClick,
  children,
}: Props) => {
  const isFieldActive = activeSortField === sortField;
  const isAscending = activeSortOrder === SortOrder.SORT_ORDER_ASCENDING;

  return (
    <button
      onClick={() => onClick(sortField!, sortOrder!)}
      css={[styles.button, isFieldActive && styles.buttonActive]}
    >
      <span css={[styles.text]}>{children}</span>
      {isFieldActive && (
        <SvgIcon
          size="10px"
          additionalStyles={[styles.icon(isFieldActive, isAscending)]}
        >
          <IconArrowDown />
        </SvgIcon>
      )}
    </button>
  );
};
