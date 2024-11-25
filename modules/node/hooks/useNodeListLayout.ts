import { useRecoilValue } from 'recoil';
import { updateTableColumns } from '@shared/index';
import { nodeSelectors } from '@modules/node';
import { useSettings } from '@modules/settings';

export const useNodeListLayout = () => {
  const tableColumns = useRecoilValue(nodeSelectors.tableColumns);
  const nodeListHeaders = useRecoilValue(nodeSelectors.nodeListHeaders);

  const { updateSettings } = useSettings();

  const updateColumns = (columns: TableColumn[]) => {
    updateTableColumns(
      tableColumns,
      columns,
      (updatedColumns: TableColumn[]) => {
        updateSettings('nodes', {
          columns: updatedColumns,
        });
      },
    );
  };

  const updateColumnVisibility = (key?: string) => {
    if (!key) return;

    const header = nodeListHeaders.find((header) => header.key === key);

    updateColumns([
      {
        key,
        isVisible: !header?.isVisible,
      },
    ]);
  };

  return {
    updateColumns,

    updateColumnVisibility,
  };
};
