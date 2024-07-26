import { SvgIcon } from '@shared/components';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { Sort } from '@shared/common/common';
import { styles } from './TableSortButton.styles';
import IconArrowDown from '@public/assets/icons/common/ArrowDown.svg';

type TableSortButtonProps = {
  children?: React.ReactNode;
  onClick: (arg0: string) => void;
  dataField?: string;
  sort?: Sort<any>;
};

export const TableSortButton = ({
  children,
  onClick,
  dataField,
  sort,
}: TableSortButtonProps) => {
  const isActive = sort?.field === dataField;
  const isAscending = sort?.order === SortOrder.SORT_ORDER_ASCENDING;

  return (
    <button
      onClick={() => onClick(dataField || '')}
      css={[styles.button, isActive && styles.buttonActive]}
    >
      <span css={[styles.text]}>{children}</span>
      {isActive && (
        <SvgIcon
          size="10px"
          additionalStyles={[styles.icon(isActive, isAscending)]}
        >
          <IconArrowDown />
        </SvgIcon>
      )}
    </button>
  );
};
