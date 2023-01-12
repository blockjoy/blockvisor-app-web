import { FC } from 'react';
import { styles } from './NodeListPageHeader.styles';
import IconTable from '@public/assets/icons/table-12.svg';
import IconGrid from '@public/assets/icons/grid-12.svg';
import { LaunchNodeButton } from '@modules/node';
import { PageTitle } from '@shared/components';

type Props = {
  activeListType: string | 'table' | 'grid';
  onTypeChanged: (type: string) => void;
};

export const NodeListPageHeader: FC<Props> = ({
  activeListType,
  onTypeChanged,
}) => (
  <>
    <h1 css={[styles.pageTitle]}>Nodes</h1>
    {/* <NodeCreate /> */}
    {/* <LaunchNodeButton /> */}
    <div css={[styles.listTypePicker, styles.endBlock]}>
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
  </>
);
