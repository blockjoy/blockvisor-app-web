import { FC } from 'react';
import { styles } from './listTypeToggle.styles';
import IconTable from '@public/assets/icons/table-12.svg';
import IconGrid from '@public/assets/icons/grid-12.svg';

type Props = {
  activeListType: string | 'table' | 'grid';
  onTypeChanged: (type: string) => void;
};

export const ListTypeToggle: FC<Props> = ({
  activeListType,
  onTypeChanged,
}) => {
  return (
    <div css={[styles.wrapper]}>
      <button
        onClick={() => onTypeChanged('table')}
        css={[
          styles.iconButton,
          activeListType === 'table' && styles.iconButtonActive,
        ]}
      >
        <IconTable />
      </button>
      <button
        onClick={() => onTypeChanged('grid')}
        css={[
          styles.iconButton,
          activeListType === 'grid' && styles.iconButtonActive,
        ]}
      >
        <IconGrid />
      </button>
    </div>
  );
};
