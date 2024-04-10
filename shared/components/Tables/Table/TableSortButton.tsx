import { styles } from './TableSortButton.styles';
import { SvgIcon } from '@shared/components';
import IconSort from '@public/assets/icons/common/Sort.svg';
import IconSortAsc from '@public/assets/icons/common/SortAsc.svg';
import IconSortDesc from '@public/assets/icons/common/SortDesc.svg';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';

type TableSortButtonProps = {
  children?: React.ReactNode;
  onClick: (arg0: string) => void;
  dataField?: string;
  activeSortField?: any;
  activeSortOrder?: SortOrder;
};

export const TableSortButton = ({
  children,
  onClick,
  dataField,
  activeSortField,
  activeSortOrder,
}: TableSortButtonProps) => {
  const isActive = dataField === activeSortField;

  return (
    <button
      onClick={() => onClick(dataField || '')}
      css={[styles.button, isActive && styles.buttonActive]}
    >
      <span css={[styles.text]}>{children}</span>
      <SvgIcon
        size="10px"
        additionalStyles={isActive ? [styles.active] : undefined}
      >
        {!isActive || !activeSortOrder ? (
          <IconSort />
        ) : activeSortOrder === SortOrder.SORT_ORDER_ASCENDING ? (
          <IconSortAsc />
        ) : (
          <IconSortDesc />
        )}
      </SvgIcon>
    </button>
  );
};
