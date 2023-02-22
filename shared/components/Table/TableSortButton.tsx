import IconSort from '@public/assets/icons/sort-12.svg';
import SizedIcon from '@modules/layout/components/shared/SizedIcon';
import { styles } from './TableSortButton.styles';

type Props = {
  children?: React.ReactNode;
  onClick: (arg0: string) => void;
  sortExpression?: string;
  activeSortExpression?: string;
};

export const TableSortButton: React.FC<Props> = ({
  children,
  onClick,
  sortExpression,
  activeSortExpression,
}) => {
  return (
    <button onClick={() => onClick(sortExpression || '')} css={[styles.button]}>
      <span css={[styles.text]}>{children}</span>
      <SizedIcon
        size="10px"
        additionalStyles={
          sortExpression === activeSortExpression ? [styles.active] : undefined
        }
      >
        <IconSort />
      </SizedIcon>
    </button>
  );
};
