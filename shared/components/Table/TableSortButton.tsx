import IconSort from '@public/assets/icons/sort.svg';
import IconSortAsc from '@public/assets/icons/sort-asc.svg';
import IconSortDesc from '@public/assets/icons/sort-desc.svg';
import { styles } from './TableSortButton.styles';
import { SvgIcon } from '../SvgIcon/SvgIcon';

type Props = {
  children?: React.ReactNode;
  onClick: (arg0: string) => void;
  sortExpression?: string;
  activeSortExpression?: string;
  activeOrder?: string;
};

export const TableSortButton: React.FC<Props> = ({
  children,
  onClick,
  sortExpression,
  activeSortExpression,
  activeOrder,
}) => {
  const isActive = sortExpression === activeSortExpression;

  return (
    <button
      onClick={() => onClick(sortExpression || '')}
      css={[styles.button, isActive && styles.buttonActive]}
    >
      <span css={[styles.text]}>{children}</span>
      <SvgIcon
        size="10px"
        additionalStyles={isActive ? [styles.active] : undefined}
      >
        {!isActive || !activeOrder ? (
          <IconSort />
        ) : activeOrder === 'asc' ? (
          <IconSortAsc />
        ) : (
          <IconSortDesc />
        )}
      </SvgIcon>
    </button>
  );
};
