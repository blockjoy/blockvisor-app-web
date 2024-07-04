import { SvgIcon } from '@shared/components';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { Sort } from '@shared/common/common';
import { styles } from './TableSortButton.styles';
import IconSort from '@public/assets/icons/common/Sort.svg';
import IconSortAsc from '@public/assets/icons/common/SortAsc.svg';
import IconSortDesc from '@public/assets/icons/common/SortDesc.svg';

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
  const isActive = dataField === sort?.field;

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
        {!isActive || !sort?.order ? (
          <IconSort />
        ) : sort?.order === SortOrder.SORT_ORDER_ASCENDING ? (
          <IconSortAsc />
        ) : (
          <IconSortDesc />
        )}
      </SvgIcon>
    </button>
  );
};
